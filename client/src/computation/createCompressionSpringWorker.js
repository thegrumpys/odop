// Keep Webpack's Worker URL syntax out of the synchronous Redux store module.
// Legacy Jest suites do not load this factory while the feature is disabled,
// but production Webpack still sees and bundles the Worker entry point.
export function createCompressionSpringWorker() {
    return new Worker(new URL('./compressionSpringWorker.js', import.meta.url));
}
