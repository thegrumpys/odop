# Stage 7.5 handoff — demo assessment and Tutor 3 search tracing

## Scope and starting point

This handoff covers all work after the Stage 7 Worker bridge commit
`8ee58f9f` (`Complete Compression Spring Wasm bridge`) through the current
uncommitted Tutor 3 tracing work on branch `investigation_of_cpp_and_webasm`.
The latest committed branch tip is `39dc54bc`.

Do not treat the Wasm Compression Spring path as production-ready. The
feature remains opt-in and is intended for parity investigation.

## Committed Stage 7.5 work

- `0943903a` added the Wasm performance/parity harness and the actual-Wasm
  Jest lane.
- `3604fc0d` expanded the demo/tutor harness to cover Compression Spring
  demo2.
- `abf6bf5f` recorded the Stage 7.5 assessment and fixed the flat-session
  round-trip fields needed for valid testing.
- `1db360c2` fixed Wasm load initialization and alert refresh so a successful
  Worker calculation atomically replaces stale legacy alert state.
- `39dc54bc` adds a visible `ODOP WASM` tag, making the active calculation
  path apparent in the development UI.

### Stage 7.5 demo/tutor assessment

`npm run cpp:benchmark:wasm` now runs a complete C++/Wasm session benchmark
and the `wasm-compression-spring-demo-tutor.mjs` parity inventory. It replays
calculation and ordinary Search actions from demo1, demo2, demo3, demo5,
demo10, demoDesignValidation, demoNewDesign, tutor3, tutor6, and tutor8.
It reports all mismatches instead of stopping on the first. Tutor7 remains
excluded because it needs five legacy Seek operations; replacing them with
ordinary Search would not be a valid test.

The historical legacy timing file is
`client/src/__test__/test-results/performance.csv`. It is not directly
comparable with the warmed Wasm-core benchmark because it includes Redux,
legacy calculations, and the full tutorial/demo action sequence.

The actual-Wasm Jest checkpoint lane is:

```sh
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:test:wasm:jest
```

It confirms normal-calculation parity at demo1 page 06 and Tutor 3 page 04.
It does not establish ordinary Search parity.

The known Stage 7.5 blocker is a severe objective mismatch at the legacy
demo2 page-05 normal-calculation checkpoint: legacy objective
`0.15692322612703405`, C++/Wasm objective `0.7292557479292445`. Earlier
inspection showed the public Startup state, material initialization, and
calculated engineering values agree. The suspected area is objective
penalty/scaling semantics, especially fixed dependent `L_2` and constrained
output scale denominators. Do not weaken the legacy expected value to make
this test pass.

Further context and commands are in
`docs/Architecture/wasm-performance-baseline.md` and `HANDOFF7.md`.

## Tutor 3 manual search investigation

The user requested an on-development comparison, without changing staging.
Tutor 3 was run through page 6 first using legacy JavaScript and then using
the Wasm Worker. Both searches reported feasibility after five iterations,
but they followed different internal paths.

The captured traces are deliberately local/ignored test artifacts:

- `tests/logs/tutor3-legacy-patsh-trace.log`
- `tests/logs/tutor3-wasm-patsh-trace.log`

The first two retained exploratory points match to the displayed precision.
At the next retained point the JavaScript and Wasm reported different search
objectives, despite nearly equal printed free-variable vectors. Subsequent
accept/reject decisions diverged: legacy rejected a later pattern move and
reduced the search step several times; Wasm continued to feasibility at the
initial step. The former short trace only printed C++ values at default stream
precision, so it does *not* prove the inputs were exactly equal. The detailed
instrumentation below exists to identify the first differing term.

The active Chrome Wasm tab was preserved at Tutor 3 page 06 after the test.
The legacy tab was closed at the user's request.

## Uncommitted work: opt-in candidate tracing

The current working tree adds a single, default-off diagnostic switch:

```sh
REACT_APP_PATSH_TRACE=true
```

Start the legacy path with:

```sh
cd client
REACT_APP_PATSH_TRACE=true npm start
```

Start the Wasm path with:

```sh
cd client
REACT_APP_ENABLE_COMPRESSION_SPRING_WASM=true REACT_APP_PATSH_TRACE=true npm start
```

Restart the React development server whenever changing either variable;
Create React App substitutes these values at build/start time. With the trace
variable absent or not `true`, no PATSH or candidate output is emitted.

### Legacy trace content

`client/src/store/middleware/patsh.js` now guards the existing exploration
and exit logs with `patshTraceEnabled()` from the new
`client/src/store/middleware/patshTrace.js` helper.

`pxUpdateObjectiveValue.js` emits one
`[PATSH_TRACE][LEGACY][CANDIDATE]` JSON record for each objective calculation
while tracing is enabled. It contains full `p` and `x` arrays, unweighted
violation sum, violation weight, optional merit contribution, final objective,
and a per-symbol record of value, validity violations, normalized feasibility
violations, scales, and pre-weight penalty contribution.

### Wasm trace content

Tracing is carried through the narrow Wasm session ABI rather than relying on
unobservable Worker stdout:

- `cpp/wasm/src/compression_spring_bindings.cpp` stores a per-session trace
  enable flag and exposes `odop_compression_spring_session_set_trace`.
- `client/src/computation/wasmCompressionSpringAdapter.js` sets that flag from
  `REACT_APP_PATSH_TRACE` before every operation.
- `cpp/core/src/optimization.cpp` only constructs trace records when enabled.
  It emits 17-digit precision candidate records containing the full P vector,
  objective, unweighted violation sum, weight, and every per-symbol objective
  term. Normal PATSH exploration/exit records are also gated.
- The Worker response returns the trace and
  `compressionSpringWasmBridge.js` writes it to the main Chrome console only
  when the flag is enabled.

The C++ `Descriptor` and `Evaluation` structures now retain stable symbol
names and candidate contribution data solely to support this comparison.

### Files currently modified or added

- `client/src/computation/wasmCompressionSpringAdapter.js`
- `client/src/store/middleware/compressionSpringWasmBridge.js`
- `client/src/store/middleware/patsh.js`
- `client/src/store/middleware/pxUpdateObjectiveValue.js`
- `client/src/store/middleware/patshTrace.js` (new)
- `cpp/CMakeLists.txt`
- `cpp/core/include/odop/optimization.hpp`
- `cpp/core/src/optimization.cpp`
- `cpp/wasm/src/compression_spring_bindings.cpp`

`client/src/computation/compressionSpringWorkerRuntime.js` is also modified
from the preceding trace-return plumbing: it forwards `response.trace` from
the Worker to the bridge. Preserve it with this work.

## Verification already completed

Passed after the current instrumentation changes:

```sh
npm run cpp:test:native
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:build:wasm
```

All six native CTests passed. The Wasm build completed and refreshed the
generated client Worker assets. A focused browser rerun with the new flag has
not yet been performed; that is the next validation step.

## Recommended continuation

1. Restart the chosen development client with the trace flag enabled.
2. Run Tutor 3 through its Search page once on legacy and once on Wasm.
3. Capture only `[PATSH_TRACE]` console records into new, separately named
   files under `tests/logs/`; do not overwrite the original short traces.
4. Compare candidates by full P vector and then locate the first per-symbol
   contribution difference. Distinguish a calculation-value discrepancy from
   a scale/constraint/penalty discrepancy before changing PATSH itself.
5. Add a targeted fixture/test for that first differing candidate before
   altering objective or calculation code.

For all side-by-side work, use Chrome directly, keep tabs alive, select **No**
if Design Recovery appears, and mark open tabs for handoff before ending the
turn. Do not create automations for this investigation.
