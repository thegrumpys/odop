import { CompressionSpringWorkerClient } from '../../../computation/compressionSpringWorkerClient';
import { createCompressionSpringWorkerRuntime } from '../../../computation/compressionSpringWorkerRuntime';
import { compressionSpringCommands } from '../../../computation/compressionSpringProtocol';
import { normalizeCompressionSpringSavedDesign } from '../../../computation/compressionSpringSchema';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';

function design() {
    return normalizeCompressionSpringSavedDesign(initialState);
}

function fakeAdapter() {
    return {
        recalculate: (current) => ({ ok: true, design: current, snapshot: current.symbols, diagnostics: [] }),
        search: (current) => ({ ok: true, design: current, snapshot: current.symbols, termination: 'Search complete.', diagnostics: [] }),
        snapshot: (current) => current.symbols
    };
}

it('hydrates, applies a multi-symbol transaction, and rejects an out-of-date base revision', () => {
    const replies = [];
    const runtime = createCompressionSpringWorkerRuntime(fakeAdapter(), (response) => replies.push(response));
    runtime.handle({ type: compressionSpringCommands.HYDRATE, requestId: 1, baseRevision: 0, revision: 1, design: design() });
    runtime.handle({ type: compressionSpringCommands.APPLY_CHANGES, requestId: 2, baseRevision: 1, revision: 2, changes: [{ id: 'Wire_Dia', numericValue: 0.12 }, { id: 'Force_1', numericValue: 25 }] });
    runtime.handle({ type: compressionSpringCommands.RECALCULATE, requestId: 3, baseRevision: 1, revision: 2 });
    expect(replies[0].snapshot).toHaveLength(54);
    expect(replies[1].snapshot.find((symbol) => symbol.id === 'Wire_Dia').numericValue).toBe(0.12);
    expect(replies[2].error).toMatch(/stale worker transaction/);
});

it('does not let a stale worker response update the caller', async () => {
    const worker = { postMessage: jest.fn(), onmessage: null };
    const client = new CompressionSpringWorkerClient(worker);
    const first = client.hydrate(design());
    const second = client.applyChanges([{ id: 'Wire_Dia', numericValue: 0.12 }]);
    worker.onmessage({ data: { requestId: 1, revision: 1, snapshot: [] } });
    worker.onmessage({ data: { requestId: 2, revision: 2, snapshot: [] } });
    await expect(first).resolves.toMatchObject({ stale: true });
    await expect(second).resolves.toMatchObject({ revision: 2 });
});

it('updates and queries system controls without advancing the visible revision for a read', () => {
    const replies = [];
    const runtime = createCompressionSpringWorkerRuntime(fakeAdapter(), (response) => replies.push(response));
    runtime.handle({ type: compressionSpringCommands.HYDRATE, requestId: 1, baseRevision: 0, revision: 1, design: design() });
    runtime.handle({ type: compressionSpringCommands.SET_SYSTEM_CONTROLS, requestId: 2, baseRevision: 1, revision: 2, changes: { maxit: 17 } });
    runtime.handle({ type: compressionSpringCommands.GET_SYSTEM_CONTROLS, requestId: 3, baseRevision: 2, revision: 2 });
    expect(replies[1].systemControls.maxit).toBe(17);
    expect(replies[2]).toMatchObject({ revision: 2, systemControls: { maxit: 17 } });
});

it('exposes system-control queries through the main-thread client', async () => {
    const worker = { postMessage: jest.fn(), onmessage: null };
    const client = new CompressionSpringWorkerClient(worker);
    const result = client.getSystemControls();
    expect(worker.postMessage).toHaveBeenCalledWith(expect.objectContaining({ type: compressionSpringCommands.GET_SYSTEM_CONTROLS, baseRevision: 0, revision: 0 }));
    worker.onmessage({ data: { requestId: 1, revision: 0, systemControls: { maxit: 600 } } });
    await expect(result).resolves.toMatchObject({ systemControls: { maxit: 600 } });
});
