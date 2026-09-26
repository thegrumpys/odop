# Stage 7 handoff — Wasm Worker bridge

## Completed

- Added the bounded Stage 7 C/Wasm session façade. It hydrates a complete
  Compression Spring flat table, applies calculation-only C++ `init`, runs
  `EQNSET`, scale/objective evaluation, and ordinary Hooke–Jeeves Search.
  It exposes opaque handles and stable symbol IDs only; React/Redux and the
  JavaScript `initUI` concern do not enter C++.
- Builds separate modular Emscripten artifacts for Node contract tests and
  the browser Worker, and copies generated `.mjs`/`.wasm` build artifacts into
  the ignored client computation asset directory.
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
- Added a full session-facade Wasm contract test: it sends every one of the
  54 stable-ID values through the opaque host ABI, invokes calculation-only
  `INIT` plus recalculation, and reads calculated numeric/text state back.
  The test found and fixed the missing Emscripten `cwrap` runtime export that
  the Worker adapter depends on.
- Verified `cd client && npm run build` successfully bundles the generated
  modular Wasm asset and Worker source. Added a Jest adapter test for stable
  IDs, extended numeric fields, text slots, and system controls.
- Added the default-off `REACT_APP_ENABLE_COMPRESSION_SPRING_WASM` gate and
  the Worker-backed Redux bridge. Feature-enabled calculation actions bypass
  the legacy dispatcher, hydrate/apply a Worker transaction, and atomically
  apply only a current revision's returned snapshot. The normal product path
  remains legacy while the flag is unset.
- The Wasm build now produces two generated artifacts from the same C++ core:
  a Node module for contract tests and a browser/Worker module for the client.
  This prevents Node-only module resolution code from entering the Webpack
  bundle; the client production build now succeeds with the Worker enabled.
- Exposed Worker system-control query/update through the client and added
  protocol round-trip tests. `patsh` now accepts a portable cooperative
  cancellation probe and native coverage verifies immediate cancellation.
  The current Worker `cancel` command still guarantees stale-result rejection;
  mid-loop signalling requires a shared/interruptible browser transport so the
  synchronous Worker can observe it while calculating.
- Added feature-bridge Jest coverage: an enabled Compression Spring edit marks
  the Redux action as Worker-handled, hydrates one authoritative transaction,
  and applies one returned snapshot; a disabled bridge leaves the legacy action
  unchanged and makes no Worker request.
- Checked in the exact unauthenticated public exports at
  `client/src/__test__/Spring/Compression/fixtures/Startup.json` and
  `Startup_Metric.json`.  Both have 54 symbols and now contract-test their
  exported P values, calculated Rate, objective value, and calculation
  termination text through the generated Wasm module.  Their omission of some
  numeric metadata also exposed an ABI bug: absent values were being coerced
  to zero.  The bridge now preserves them as absent (NaN across the narrow ABI)
  and C++ hydrates missing validity bounds as unbounded.

## Boundaries retained

- C++ `init` remains calculation-only. `compressionSpringInitUI.js` remains
  client presentation logic and is not called by the Wasm core.
- Search continues wholly inside C++ from compiled numerical state; no Redux
  state or symbol-table traversal occurs in its candidate loop.
- The legacy dispatcher remains the active production path unless
  `REACT_APP_ENABLE_COMPRESSION_SPRING_WASM=true` is set at client build time.
  With the flag set, the Worker middleware atomically applies only the current
  calculation snapshot; rollout remains separate from compatibility acceptance.
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

`Startup.json` and `Startup_Metric.json` are exact unauthenticated public
File > Export captures supplied for this repository. They are the normal
recalculation compatibility fixtures. Their `objective_value`, P values and
calculation termination string are asserted now; ordinary Search termination
fixtures remain the next compatibility increment before feature rollout.
