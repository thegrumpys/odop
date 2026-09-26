import { applyWasmComputationSnapshot } from '../actions';
import { LOAD, LOAD_INITIAL_STATE, CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH,
    FIX_SYMBOL_VALUE, FREE_SYMBOL_VALUE, CHANGE_SYMBOL_CONSTRAINT, CHANGE_SYMBOL_CONSTRAINTS,
    SET_SYMBOL_FLAG, RESET_SYMBOL_FLAG, CHANGE_INPUT_SYMBOL_VALUES } from '../types';
import { normalizeCompressionSpringSavedDesign } from '../../computation/compressionSpringSchema';
import { invokeCheck } from './invokeCheck';

// Simple value/control updates can be owned by the Worker immediately. The
// legacy reducers/dispatcher still assemble the richer fix/constraint state;
// once complete, that authoritative domain state is synchronized atomically.
const workerCommands = new Set([CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH]);
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
        const compression = store.getState().model.type === 'Spring/Compression' || (action.payload && action.payload.model && action.payload.model.type === 'Spring/Compression');
        const active = enabled() && compression;
        if (!active || action.type === 'modelSlice/applyWasmComputationSnapshot') return next(action);
        const handledByWorker = workerCommands.has(action.type);
        const result = next({ ...action, meta: { ...action.meta, wasmComputationHandled: handledByWorker } });
        if (action.type === LOAD || action.type === LOAD_INITIAL_STATE) hydrated = false;
        if (!workerCommands.has(action.type) && !synchronizedDomainActions.has(action.type) && action.type !== LOAD && action.type !== LOAD_INITIAL_STATE) return result;
        const design = normalizeCompressionSpringSavedDesign(store.getState().model);
        // Rich operations are intentionally sent as a complete domain
        // transaction. This preserves all flags, bounds, and scale metadata
        // created by the legacy reducer until those actions move into the
        // Worker protocol themselves.
        const request = !hydrated || synchronizedDomainActions.has(action.type) ? client.hydrate(design) : action.type === CHANGE_SYMBOL_VALUE
            ? client.applyChanges([{ id: action.payload.name, numericValue: action.payload.value }])
            : action.type === CHANGE_SYSTEM_CONTROLS_VALUE ? client.setSystemControls(action.payload.system_controls)
            : client.search(`search-${Date.now()}`);
        hydrated = true;
        request.then((response) => {
            if (!response.stale && response.snapshot) {
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
