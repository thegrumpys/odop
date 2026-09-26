import { applyWasmComputationSnapshot } from '../actions';
import { LOAD, LOAD_INITIAL_STATE, CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH } from '../types';
import { normalizeCompressionSpringSavedDesign } from '../../computation/compressionSpringSchema';

const workerCommands = new Set([CHANGE_SYMBOL_VALUE, CHANGE_SYSTEM_CONTROLS_VALUE, SEARCH]);

// Installed only by a feature-enabled host. It deliberately sends Redux's
// post-reducer state as a single initial hydration, then sends only domain
// changes. Legacy dispatcher execution is suppressed via the action marker.
export function createCompressionSpringWasmBridge(client, enabled = () => false) {
    let hydrated = false;
    return (store) => (next) => (action) => {
        const compression = store.getState().model.type === 'Spring/Compression' || (action.payload && action.payload.model && action.payload.model.type === 'Spring/Compression');
        const active = enabled() && compression;
        if (!active || action.type === 'modelSlice/applyWasmComputationSnapshot') return next(action);
        const result = next({ ...action, meta: { ...action.meta, wasmComputationHandled: workerCommands.has(action.type) || action.type === LOAD || action.type === LOAD_INITIAL_STATE } });
        if (action.type === LOAD || action.type === LOAD_INITIAL_STATE) hydrated = false;
        if (!workerCommands.has(action.type) && action.type !== LOAD && action.type !== LOAD_INITIAL_STATE) return result;
        const design = normalizeCompressionSpringSavedDesign(store.getState().model);
        const request = !hydrated ? client.hydrate(design) : action.type === CHANGE_SYMBOL_VALUE
            ? client.applyChanges([{ id: action.payload.name, numericValue: action.payload.value }])
            : action.type === CHANGE_SYSTEM_CONTROLS_VALUE ? client.setSystemControls(action.payload.system_controls)
            : client.search(`search-${Date.now()}`);
        hydrated = true;
        request.then((response) => {
            if (!response.stale && response.snapshot) store.dispatch(applyWasmComputationSnapshot(response.snapshot, response.objective, response.termination));
        }).catch(() => { hydrated = false; });
        return result;
    };
}
