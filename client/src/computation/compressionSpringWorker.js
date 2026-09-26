import createOdopModule from './wasm/odop_wasm.mjs';
import { createWasmCompressionSpringAdapter } from './wasmCompressionSpringAdapter';
import { createCompressionSpringWorkerRuntime } from './compressionSpringWorkerRuntime';

let runtime;
const ready = createOdopModule().then((Module) => {
    runtime = createCompressionSpringWorkerRuntime(createWasmCompressionSpringAdapter(Module), (message) => postMessage(message));
});

self.onmessage = async ({ data }) => {
    await ready;
    runtime.handle(data);
};
