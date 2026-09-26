import { compressionSpringCommands } from './compressionSpringProtocol';

// Main-thread domain client. A response is useful only when it still matches
// the latest user-visible revision; stale calculations are never applied.
export class CompressionSpringWorkerClient {
    constructor(worker) {
        this.worker = worker;
        this.revision = 0;
        this.requestId = 0;
        this.pending = new Map();
        this.worker.onmessage = ({ data }) => this.receive(data);
    }

    receive(response) {
        const pending = this.pending.get(response.requestId);
        if (!pending) return;
        this.pending.delete(response.requestId);
        if (response.revision !== this.revision) {
            pending.resolve({ stale: true, response });
            return;
        }
        response.error ? pending.reject(new Error(response.error)) : pending.resolve(response);
    }

    command(type, payload = {}, changesRevision = true) {
        const baseRevision = this.revision;
        const revision = changesRevision ? baseRevision + 1 : baseRevision;
        if (changesRevision) this.revision = revision;
        const requestId = ++this.requestId;
        const request = { type, requestId, baseRevision, revision, ...payload };
        return new Promise((resolve, reject) => {
            this.pending.set(requestId, { resolve, reject });
            this.worker.postMessage(request);
        });
    }

    hydrate(design) { return this.command(compressionSpringCommands.HYDRATE, { design }); }
    applyChanges(changes) { return this.command(compressionSpringCommands.APPLY_CHANGES, { changes }); }
    setSystemControls(changes) { return this.command(compressionSpringCommands.SET_SYSTEM_CONTROLS, { changes }); }
    recalculate(initialize = false) { return this.command(compressionSpringCommands.RECALCULATE, { initialize }); }
    search(jobId) { return this.command(compressionSpringCommands.SEARCH, { jobId }); }
    cancel(jobId) { return this.command(compressionSpringCommands.CANCEL, { jobId }, false); }
    snapshot() { return this.command(compressionSpringCommands.SNAPSHOT, {}, false); }
}
