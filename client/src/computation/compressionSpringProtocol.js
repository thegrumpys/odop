// Messages are deliberately plain data so they can cross a Worker boundary
// and be exercised with a fake Worker in Jest.
export const compressionSpringCommands = Object.freeze({
    HYDRATE: 'hydrateDesign',
    APPLY_CHANGES: 'applyChanges',
    SET_SYSTEM_CONTROLS: 'setSystemControls',
    GET_SYSTEM_CONTROLS: 'getSystemControls',
    RECALCULATE: 'recalculate',
    SEARCH: 'search',
    CANCEL: 'cancel',
    SNAPSHOT: 'snapshot'
});

export function workerResult(request, payload = {}) {
    return {
        type: 'result',
        requestId: request.requestId,
        baseRevision: request.baseRevision,
        revision: request.revision,
        ...payload
    };
}

export function workerError(request, message) {
    return workerResult(request, { error: message, diagnostics: [message] });
}
