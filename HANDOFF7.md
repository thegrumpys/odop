# Stage 7 handoff — Wasm Worker bridge

## Completed

- Added the bounded Stage 7 C/Wasm session façade. It hydrates a complete
  Compression Spring flat table, applies calculation-only C++ `init`, runs
  `EQNSET`, scale/objective evaluation, and ordinary Hooke–Jeeves Search.
  It exposes opaque handles and stable symbol IDs only; React/Redux and the
  JavaScript `initUI` concern do not enter C++.
- Changed the modular Emscripten artifact to support `web`, `worker`, and
  `node`, and copies generated `.mjs`/`.wasm` build artifacts into the ignored
  client computation asset directory.
- Added a Worker protocol with hydrate, transactional change, controls,
  recalculation, snapshot, search, and cancellation commands. Every response
  carries base/result revision IDs. The main-thread client rejects responses
  not matching its current revision, so an older calculation cannot replace a
  newer edit.
- Added a Wasm adapter which alone handles Emscripten pointers/handles, plus a
  Worker entry point. The runtime is isolated from browser globals for Jest
  coverage.
- Added Jest coverage for complete hydration, atomic multi-symbol change
  transactions, stale base-revision errors, and stale response rejection.
- Expanded the Wasm equation-set contract test from the legacy
  `client/src/__test__/Spring/Compression/eqnset.test.js` vectors. It now
  proves all three pathological cases through the generated module, including
  their intentional `Infinity` and `NaN` values.

## Boundaries retained

- C++ `init` remains calculation-only. `compressionSpringInitUI.js` remains
  client presentation logic and is not called by the Wasm core.
- Search continues wholly inside C++ from compiled numerical state; no Redux
  state or symbol-table traversal occurs in its candidate loop.
- The legacy dispatcher remains the active production path. The Stage 7
  Worker client is additive and ready for feature-flag middleware wiring;
  keep the flag rollout separate from numerical compatibility acceptance.
- Cancellation makes a queued/finished job stale immediately through revision
  semantics. Cooperative in-loop cancellation needs a cancellation callback in
  `patsh` and is a follow-up if long search latency requires it.

## Verification

Passed:

```sh
cmake -S cpp -B /private/tmp/odop-stage7-build -DODOP_BUILD_NATIVE_TESTS=ON
cmake --build /private/tmp/odop-stage7-build
ctest --test-dir /private/tmp/odop-stage7-build --output-on-failure

cd client && CI=true npm test -- --runInBand \
  src/__test__/Spring/Compression/compressionSpringWorker.test.js

source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:test:wasm
```

All six native CTests, the Worker Jest tests, the legacy direct equation-set
and Stage 0 fixture Jest tests, and the Wasm contract tests passed.

## Compatibility oracle

The public `https://odop.herokuapp.com/` page was reachable but its export UI
requires JavaScript interaction. Stage 7 did not check in a new public
`Startup.json` fixture; before enabling the Worker path, capture unauthenticated
exports and compare `objective_value`, P values, and search termination text.
