# Stage 7.8 handoff — Compression Spring Seek completed

Completed October 4, 2026 on `investigation_of_cpp_and_webasm`, starting at
`898f7344`. This replaces the preparation note and
can be updated as the handoff evolves. The November 9 update below records
the rebased baseline for Stage 8. Stage 10 Trade remains later work.

## Accepted result

Seek now runs through the C++ session, Wasm adapter, Worker, and Redux bridge.
All five Tutor7 Seek outcomes match independently captured legacy numerical
fixtures and exact messages. A fresh manual Chrome run matched development
at http://localhost:3000 against https://odop-staging.herokuapp.com through
all 17 Tutor7 pages.

## Preparation and rebuilt artifacts

Read HANDOFF0.md through HANDOFF7.md, especially HANDOFF7_5.md, plus the
architecture plan. The older handoff's Tutor3 propagation issue was already
fixed in cd233e46; its demo2 mismatch did not reproduce. No tracked engine
files or computation imports were missing. Startup/Metric and regression
fixtures parsed successfully.

Clean rebuilt native, Node Wasm, and browser Worker Wasm with Node 20.20.2,
CMake 4.4.3, and Emscripten 3.1.73. Browser artifacts and client copies matched
SHA256 hashes. Binaries are ignored; copy_if_different can preserve timestamps.

```sh
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
export PATH=/Users/brianwatt/.nvm/versions/node/v20.20.2/bin:$PATH
npm run cpp:test:native
npm run cpp:test:wasm
npm run cpp:test:wasm:jest
```

Emscripten linking needs approved access to the SDK cache outside the workspace.
No compiler or SDK installation was needed.

## Implementation

- optimization.hpp/.cpp adds numeric merit, an optional Search objective
  threshold, and legacy Seek orchestration: estimate search with threshold -1,
  feasibility/restore branch, final merit search, final penalty-only objective.
- Preserve finalized FIXED independent-variable scale denominators. Full-state
  comparison exposed a Force_1 denominator mismatch missed by value checks.
- Disable multiply/add contraction for Clang/GNU core builds with
  `-ffp-contract=off`. Native fused arithmetic diverged in the final Tutor7
  Seek; separate operations now match JavaScript and scalar Wasm.
- Extend session ABI and both CMake export lists with Seek and structured
  outcomes. Marshal `mfn_wt` as control field 9. Client units and precision
  reproduce legacy completion, constraint-limited, and repeat messages.
- Route SEEK through the Worker, suppress legacy numerical execution, and
  hydrate before first-use Search/Seek. Revision checks reject stale results.
- Cancellation invalidates pending client jobs immediately. Worker restores a
  completed cancelled job's baseline when its revision is still current.
  Native cooperative cancellation restores the baseline during iteration.
- Keep Material_Type numeric in the core while displaying User_Specified for
  property methods 2/3. Hydration uses its old numeric index, defaulting to
  MUSIC_WIRE index 2. Snapshot application reapplies initUI to preserve material
  presentation and user-property editability.

## Regression coverage

`client/src/__test__/Spring/Compression/fixtures/tutor7-seek.json` captures
legacy inputs and outputs for pages 06, 07, 08, 13, and 16, independently of
C++. Native and real-Wasm tests compare all 54 symbols, constraints, flags,
limits, violations, scales, targets, and objectives. Edge cases include invalid
targets, no free variables, constraint-limited MAX, zero merit weight, and
immediate/in-flight native cancellation. Worker tests cover cancellation,
stale results, baseline restoration, and initial hydration.

Passed:

- Native CTest: 7/7.
- Actual Node Wasm contract runners, including all five Seek fixtures.
- Actual-Wasm Jest: 3 suites / 3 tests.
- Full Wasm-enabled client Jest: 40 suites / 148 tests; three real-Wasm tests
  skipped there and run separately above.
- Added material hydration regression: schema tests 8/8.
- Computational inventory: 11 workflows / 27 matching checkpoints / zero
  mismatches, retaining the earlier 20 checkpoints.

- Final Wasm-enabled React production build: passed (existing bundle-size advisory).
- Backend Mocha with configured test database: 56/56 passed with approved
  network access. The earlier sandboxed attempt failed database DNS resolution.
- Final `git diff --check`: passed.

## October 4 manual Chrome parity

Used Chrome directly with clean Startup sessions and Help → Tutorial → tutor7.
No recovery dialog appeared; choose No if it appears in a future session.
Development displayed ODOP WASM with the required Wasm flag and user's backend.
Compared every transition from page 02 through final page 17 after launching
page 01. No differences in input/select values, constraints, checkbox states,
disabled states, feasibility labels, or messages. All Seek messages matched:

| Page | Seek | Result |
| --- | --- | --- |
| 06 | Weight MIN | 0.06083 → 0.01835 pounds; 69.83% |
| 07 | Rate MIN | 19.87 → 1.825 Lb/In; 90.82%; repeat advice |
| 08 | L_Solid MIN | 1.512 → 0.3268 inches; 78.38%; repeat advice |
| 13 | Weight MIN | 0.6793 → 0.4915 pounds; 27.65% |
| 16 | Force_2 MAX | 39.00 → 226.6 pounds; 480.9% |

Automated fixtures verified numerical objectives and complete metadata;
manual comparison used rendered controls and messages. Evidence is saved at
`/private/tmp/odop-stage78-chrome-parity.json`,
`/private/tmp/odop-stage78-dev-tutor7.jpg`, and
`/private/tmp/odop-stage78-staging-tutor7.jpg`. At the end of that run, both tabs were at page 17.

## November 9 rebase and model update

Rebased `investigation_of_cpp_and_webasm` onto `origin/master` at
`711f84f4`. All 21 commits replayed without conflicts. The rebase produced
`b027c352`. This handoff accompanies the follow-up model and test changes.

- C++ and WebAssembly now use the current Compression Spring model with six P
  and 54 X slots. The port includes standard and user-specified end geometry,
  plus the updated solid-length and wire-volume calculations. Saved designs
  still go through the existing ODOP migration before Worker hydration.
- The current US and Metric startup regression runs compiled Wasm in a Node
  worker thread through the real Worker protocol. It compares startup results,
  a wire-diameter edit, and standard and custom end-geometry changes against
  the current JavaScript calculations.
- All five Tutor 7 Seek checkpoints were refreshed independently from the
  current JavaScript model. The native and Wasm comparisons now cover 60
  symbols. The updated Weight Seek messages are 0.05376 → 0.01460 pounds
  (72.85%) on page 06 and 0.6480 → 0.4628 pounds (28.57%) on page 13. The
  other three messages match the October 4 results.
- Passed 376 frontend tests across 54 suites with actual Wasm tests enabled,
  68 backend tests, all seven native CTests, and the standalone Wasm suite.
  The Wasm-enabled React production build and both Wasm benchmark runners
  also completed successfully.

### Open acceptance and build work

- Repeat the side-by-side Chrome walkthrough on the rebased model, including
  all 17 Tutor 7 pages. The October 4 Chrome evidence predates the model
  update. The new Node worker test and React build cover automated behavior.
- Generated client Wasm files and `cpp/build/` outputs are ignored. Run
  `npm run cpp:build:wasm` before the client build. The normal Heroku build command still needs a Wasm generation step
  for a clean Wasm-enabled deployment.

## Stage 8 entry points and limitations

Wasm execution is synchronous inside the browser Worker. CANCEL cannot
interrupt its active loop; the client immediately discards cancelled results
and the Worker restores its baseline when cancellation is processed. Do not
claim mid-loop browser interruption. Stage 8 must choose a transport or
iteration strategy if responsive interruption is required.

Implement autosearch after coherent recalculation, edit/slider debounce and
coalescing, current-revision-only results, pending/running/cancelled UI states,
and browser edit-to-visible latency measurements. Start from the current
Worker client, runtime, and Redux bridge. The existing UI already exposes
`enable_auto_search`; Stage 8 needs the Worker to schedule optimization after
the recalculation for the same revision. Preserve the current US and Metric
Worker startup test, Tutor 3 full-state Search, and all five refreshed Tutor 7
Seek fixtures as regression gates.

Always use Node20 and the Wasm flag for this branch's client:

```sh
cd client
BROWSER=none REACT_APP_ENABLE_COMPRESSION_SPRING_WASM=true npm start
```

The October 4 run used the backend on port 5000 and the Wasm client on port
3000. Check the local services before resuming Chrome parity. Follow
`AGENTS.md` and mark both Chrome tabs for handoff before ending any turn that
observes or compares them. The original Stage 7.8 work was committed after
verification. No deployment was performed.
