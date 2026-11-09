import { applyWasmComputationSnapshot } from '../actions';
import { STARTUP, RESTORE_AUTO_SAVE, LOAD, LOAD_INITIAL_STATE, CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH, SEEK,
    FIX_SYMBOL_VALUE, FREE_SYMBOL_VALUE, CHANGE_SYMBOL_CONSTRAINT, CHANGE_SYMBOL_CONSTRAINTS,
    SET_SYMBOL_FLAG, RESET_SYMBOL_FLAG, CHANGE_INPUT_SYMBOL_VALUES } from '../types';
import { normalizeCompressionSpringSavedDesign } from '../../computation/compressionSpringSchema';
import { invokeCheck } from './invokeCheck';

const patshTraceEnabled = process.env.REACT_APP_PATSH_TRACE === 'true';

// Simple value/control updates can be owned by the Worker immediately. The
// legacy reducers/dispatcher still assemble the richer fix/constraint state;
// once complete, that authoritative domain state is synchronized atomically.
const workerCommands = new Set([CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH, SEEK]);
const modelLoads = new Set([STARTUP, LOAD, LOAD_INITIAL_STATE, RESTORE_AUTO_SAVE]);
const synchronizedDomainActions = new Set([
    FIX_SYMBOL_VALUE, FREE_SYMBOL_VALUE, CHANGE_SYMBOL_CONSTRAINT,
    CHANGE_SYMBOL_CONSTRAINTS, SET_SYMBOL_FLAG, RESET_SYMBOL_FLAG,
    CHANGE_INPUT_SYMBOL_VALUES
]);

// Installed only by a feature-enabled host. It deliberately sends Redux's
// post-reducer state as a single initial hydration, then sends only domain
// changes. Load transactions retain the legacy dispatcher: it establishes
// material-derived fields and input editability before that completed state is
// handed to the Worker.
export function createCompressionSpringWasmBridge(client, enabled = () => false) {
    let hydrated = false;
    return (store) => (next) => (action) => {
        if (!enabled() || action.type === 'modelSlice/applyWasmComputationSnapshot') return next(action);
        const loading = modelLoads.has(action.type);
        const compression = store.getState().model.type === 'Spring/Compression';
        if (!loading && !compression) return next(action);
        const handledByWorker = workerCommands.has(action.type);
        const result = next({ ...action, meta: { ...action.meta, wasmComputationHandled: handledByWorker } });
        if (loading) hydrated = false;
        if (store.getState().model.type !== 'Spring/Compression') return result;
        if (!loading && !handledByWorker && !synchronizedDomainActions.has(action.type)) return result;
        const design = normalizeCompressionSpringSavedDesign(store.getState().model);
        // Rich operations are intentionally sent as a complete domain
        // transaction. This preserves all flags, bounds, and scale metadata
        // created by the legacy reducer until those actions move into the
        // Worker protocol themselves.
        const needsHydration = !hydrated || synchronizedDomainActions.has(action.type);
        const runOptimization = () => action.type === SEEK
            ? client.seek(action.payload.name, action.payload.minmax, `seek-${Date.now()}`)
            : client.search(`search-${Date.now()}`);
        const request = needsHydration ? (action.type === SEARCH || action.type === SEEK
            ? client.hydrate(design).then((response) => response.stale ? response : runOptimization())
            : client.hydrate(design)) : action.type === CHANGE_SYMBOL_VALUE
            ? client.applyChanges([{ id: action.payload.name, numericValue: action.payload.value }])
            : action.type === CHANGE_SYSTEM_CONTROLS_VALUE ? client.setSystemControls(action.payload.system_controls)
            : runOptimization();
        hydrated = true;
        request.then((response) => {
            if (!response.stale && response.snapshot && store.getState().model.type === 'Spring/Compression') {
                if (patshTraceEnabled && response.trace) response.trace.trim().split('\n').forEach((line) => console.log(line));
                store.dispatch(applyWasmComputationSnapshot(response.snapshot, response.objective, response.termination));
                // The Worker result is a complete transaction. Rebuild alerts
                // from its final snapshot so an alert raised by a pre-search
                // legacy action cannot survive a successful Wasm search.
                invokeCheck(store);
            }
        }).catch(() => { hydrated = false; });
        return result;
    };
}
