import { compressionSpringChangeImpact } from './compressionSpringSchema';
import { compressionSpringCommands, workerError, workerResult } from './compressionSpringProtocol';

// Kept separate from the browser Worker entry point so protocol behavior is
// testable in Jest without loading Wasm or relying on Worker globals.
export function createCompressionSpringWorkerRuntime(adapter, postMessage) {
    let design;
    let revision = 0;
    const cancelledJobs = new Set();

    function calculate(request, initialize) {
        const response = adapter.recalculate(design, { initialize });
        if (!response.ok) return workerError(request, response.diagnostic || 'Compression Spring calculation failed.');
        design = response.design;
        return workerResult(request, {
            snapshot: response.snapshot,
            systemControls: design.systemControls,
            diagnostics: response.diagnostics || []
        });
    }

    function handle(request) {
        try {
            if (!request || !request.type) return;
            if (request.type === compressionSpringCommands.CANCEL) {
                cancelledJobs.add(request.jobId);
                postMessage(workerResult(request, { cancelled: true }));
                return;
            }
            if (request.baseRevision !== undefined && request.baseRevision !== revision) {
                postMessage(workerError(request, `stale worker transaction (expected revision ${revision})`));
                return;
            }
            switch (request.type) {
                case compressionSpringCommands.HYDRATE:
                    design = request.design;
                    revision = request.revision;
                    postMessage(calculate(request, true));
                    return;
                case compressionSpringCommands.APPLY_CHANGES: {
                    if (!design) { postMessage(workerError(request, 'design must be hydrated before changes')); return; }
                    // Build the complete replacement before calculating: a catalog
                    // transaction never exposes its intermediate values to C++.
                    const symbols = new Map(design.symbols.map((symbol) => [symbol.id, symbol]));
                    let initialize = false;
                    for (const change of request.changes || []) {
                        const current = symbols.get(change.id);
                        if (!current) { postMessage(workerError(request, `unknown Compression Spring symbol: ${change.id}`)); return; }
                        symbols.set(change.id, { ...current, ...change });
                        initialize = initialize || compressionSpringChangeImpact(change.id) === 'initialize-and-evaluate';
                    }
                    design = { ...design, symbols: design.symbols.map((symbol) => symbols.get(symbol.id)) };
                    revision = request.revision;
                    postMessage(calculate(request, initialize));
                    return;
                }
                case compressionSpringCommands.SET_SYSTEM_CONTROLS:
                    if (!design) { postMessage(workerError(request, 'design must be hydrated before controls')); return; }
                    design = { ...design, systemControls: { ...design.systemControls, ...request.changes } };
                    revision = request.revision;
                    postMessage(calculate(request, false));
                    return;
                case compressionSpringCommands.GET_SYSTEM_CONTROLS:
                    postMessage(workerResult(request, { systemControls: design && design.systemControls }));
                    return;
                case compressionSpringCommands.RECALCULATE:
                    revision = request.revision;
                    postMessage(calculate(request, Boolean(request.initialize)));
                    return;
                case compressionSpringCommands.SEARCH: {
                    if (!design) { postMessage(workerError(request, 'design must be hydrated before search')); return; }
                    revision = request.revision;
                    if (cancelledJobs.has(request.jobId)) { postMessage(workerResult(request, { cancelled: true })); return; }
                    const response = adapter.search(design);
                    if (!response.ok) { postMessage(workerError(request, response.diagnostic || 'Compression Spring search failed.')); return; }
                    design = response.design;
                    postMessage(workerResult(request, { snapshot: response.snapshot, termination: response.termination, diagnostics: response.diagnostics || [] }));
                    return;
                }
                case compressionSpringCommands.SNAPSHOT:
                    postMessage(workerResult(request, { snapshot: adapter.snapshot(design) }));
                    return;
                default:
                    postMessage(workerError(request, `unknown Compression Spring worker command: ${request.type}`));
            }
        } catch (error) {
            postMessage(workerError(request, error.message || String(error)));
        }
    }
    return { handle };
}
