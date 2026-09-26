# Compression Spring Wasm performance baseline

Run the normal-recalculation benchmark after activating Emscripten:

```sh
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:benchmark:wasm
```

The benchmark uses the exact public US and Metric `Startup` exports and the
normal-calculation checkpoints from Compression Spring `demo1` page 06 and
`tutor3` page 04. It reports median and p95 milliseconds for 100 warmed-up
Wasm session hydrations plus calculation-only `INIT`, repeated `INIT` plus
recalculation, and steady `EQNSET`/objective recalculation.

It deliberately reports timings rather than asserting a fixed duration in CI:
browser, Node, CPU load, and Wasm compilation differ by host. Calculation
success, finite Rate, and finite objective are strict checks.

## Stage 7.5 full demo and tutor assessment

The same command also runs `wasm-compression-spring-demo-tutor.mjs`. It
replays the computational actions in every Compression Spring demo/tutor Jest
trace that uses calculation and Search only: demo1, demo2, demo3, demo5,
demo10, demoDesignValidation, demoNewDesign, tutor3, tutor6, and tutor8.
Every Search checkpoint records its legacy objective, Wasm objective,
termination condition, match status (absolute tolerance `5e-7`), and elapsed
time. It deliberately reports mismatches instead of stopping at the first
one, so a single run produces an honest compatibility inventory.

Tutor7 is excluded because it includes five legacy Seek operations. Seek has
not yet been ported to the C++/Wasm session API, and substituting Search would
not be a valid comparison.

This lane measures a complete C++/Wasm session transaction (design hydration,
calculation, and Search) in Node. It is suitable for algorithm parity and
relative Wasm performance assessment, but is not a claim about browser
Worker-to-Redux latency. The latter requires Stage 8 cancellation and UI
lifecycle work.

## Relationship to existing demo and tutorial history

`client/src/__test__/test-results/performance.csv` is the historical record
for complete legacy Jest action traces. For example, its most recent recorded
release (`6_2_1`) lists 31 ms for `Compression/demo1` and 53 ms for
`Compression/tutor3`. Those values include Redux, legacy JavaScript
calculation, every action in the tutorial/demo sequence, and (where present)
Search. They must not be directly compared with this benchmark's warmed,
normal-calculation Wasm-core timings.

The two datasets deliberately share the demo/tutor checkpoints. In Stage 8,
the same traces will be run through a browser Worker and measured from edit to
Redux snapshot, providing a valid end-to-end Worker/Wasm-versus-legacy series
to append to `performance.csv` or its successor.

## Actual Wasm Jest checkpoint lane

Run this integration lane to build the Node Wasm artifact and execute a client
Jest test which launches that real artifact (not a mocked Worker adapter):

```sh
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:test:wasm:jest
```

It replays `demo1` page 06 and `tutor3` page 04 normal-calculation checkpoints
through the opaque C++ session ABI and compares their objectives with the
legacy action-trace assertions. Search checkpoints are intentionally excluded
until Stage 8 owns their end-to-end behaviour and cancellation contract.
