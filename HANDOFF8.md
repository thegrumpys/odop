# Stage 8 handoff — Worker-managed Auto Search

**Status:** Planned on November 9, 2026. Stage 8 implementation has yet to begin.
Start from `2159de4d` on `investigation_of_cpp_and_webasm`. See
[HANDOFF7_8.md](HANDOFF7_8.md) and the
[architecture plan](docs/Architecture/computational-engine-wasm-plan.md#stage-8--enable-autosearch).

## Starting point and open work

Use the Node version declared in `package.json` (`26.x` as of this update)
for Stage 8 development and verification.

- Current Compression Spring initialization, recalculation, Search, and Seek
  run through C++/Wasm. Current US and Metric startup designs pass the real
  Worker regression. ODOP migrates saved designs before Worker hydration.
- The November 9 rerun at `2159de4d` used Node `26.13.0` and npm `11.20.0`.
  All 376 frontend tests (54 suites), 68 backend tests, seven native CTests,
  and the standalone Wasm suite passed. The Wasm-enabled production build
  and both benchmark runners also completed successfully.
- Repeat Chrome acceptance on the rebased model, including all 17 Tutor 7
  pages. The October 4 walkthrough predates the current end-geometry model.
- The existing Auto Search setting is exposed in Alerts and Preferences.
  Several React edit handlers inspect the Redux objective and dispatch
  `search('Auto')`. For Worker-backed edits, that objective can belong to the
  previous calculation. Stage 8 must give the current recalculation and its
  optional optimization a single owner.
- The browser Worker runs Wasm synchronously. Revision checks can discard a
  stale result, but a queued CANCEL cannot interrupt the active numerical
  loop or free that Worker to recalculate a newer edit.
- The Wasm artifacts are generated and ignored. A clean Wasm-enabled Heroku
  build still needs an explicit generation step. Keep deployment integration
  separate from Stage 8 unless browser acceptance depends on it.

## Scope and behavior

Deliver Auto Search for feature-enabled Compression Spring. Preserve the
existing Auto Search preference and manual Search/Seek behavior. Leave
feature-disabled paths and other design types on their existing behavior.
Stage 9 rollout and cleanup and Stage 10 Trade are separate work.

For an eligible engineering edit, publish the recalculated snapshot and
alerts first. Consider Auto Search only when the current calculation
succeeds, Auto Search is enabled, and the finite objective is at or above
`objmin`. Verify this boundary against the existing UI. Audit which value,
configuration, constraint, and fixed/free edits currently qualify. Preserve
their intent when routing through the Worker. Auto Fix already runs in
React/Redux. Deliver the edited value and its fixed flag in the same Worker
transaction before scheduling Auto Search. The optimizer must preserve that
value. Treat loads and preference
toggles as synchronization boundaries. Verify existing enable-toggle
behavior before deciding whether it should trigger a run on its own.

## Implementation sequence

1. **Capture behavior and latency.** Trace the current Auto Search triggers
   in `SymbolValue.jsx`, the name/value and constraint row components, and
   `AlertsAccordion.jsx`. Include focus changes to manual Search and Seek.
   Capture a deterministic case from the current JavaScript calculation or
   an independently verified manual Search from the same post-edit state.
   Record the full input, expected engineering state, objective, termination,
   and alerts. Measure the current edit-to-recalculation and search times in
   Chrome before selecting debounce or budget defaults.
2. **Move scheduling to the Worker-backed bridge.** In
   `compressionSpringWasmBridge.js`, group each committed edit into a coherent
   transaction. Use existing schema change-impact classification and
   recalculate with INIT when needed. Apply the current recalculation result
   before scheduling optimization. Gate existing component-triggered Auto
   Search only for this path so each eligible edit can launch at most one job.
   Coalesce slider events to the latest value and debounce valid committed
   text edits. Preserve the latest unsent edit and define when blur, Enter,
   and slider release flush it. Partial text stays in the UI.
3. **Add a revision-bound Auto Search job.** Reuse C++ PATSH and its existing
   mathematical controls. Carry a job ID, the recalculation revision, and an
   immutable copy of the initialized design and controls. Keep revision and
   job checks at both result acceptance and state application. If a result
   is accepted, synchronize the primary Worker and Redux before the next
   edit can read that state. Apply the snapshot, objective, termination, and
   refreshed alerts together. Keep scheduler and job status transient.
4. **Make cancellation release the calculation path.** Preferred starting
   design is a separate optimization Worker using the existing Wasm module.
   Keep the primary Worker available for recalculation. Reuse a warm optimizer
   when idle and terminate an active optimizer on cancellation or supersession.
   Use a cooperative or chunked PATSH alternative only if measurements show
   the separate Worker startup or memory cost is unacceptable. Never apply
   partial results on cancellation. A new edit, load, disabled preference,
   or manual Search/Seek must invalidate pending automatic work. Verify that
   manual actions start from the latest recalculated state. Expose pending,
   running, cancelled, and failure states using the existing UI conventions.
5. **Set and verify the work budget.** Report evaluation count and termination
   reason. The existing `maxit` limits iterations and is distinct from an
   evaluation cap. Choose an Auto Search evaluation cap and cancellation
   latency target after baseline measurement. If needed, add an optional
   Auto Search-only cap to the C++ search options and define the result when
   it is reached. Preserve manual Search and Seek defaults. Measure cold and
   warm edit-to-visible recalculation, search completion, and cancellation
   recovery separately. Record p50/p95 and job counts for text and slider
   bursts. Use controlled clocks for automated timing assertions.

## Tests to write

| Layer | Required coverage |
| --- | --- |
| Scheduler and Redux bridge Jest | Fake timers and deferred responses. Cover disabled and feasible edits, the `objmin` boundary, latest-objective gating, valid text debounce, slider coalescing and flush, batched configuration and constraint changes, and no duplicate component-triggered search. With Auto Fix enabled, verify that the optimizer receives the edited value and fixed flag together and leaves that value unchanged. Verify a manual Search or Seek supersedes pending Auto Search and uses the newest state. |
| Worker protocol Jest | Verify job ID and revision checks, response ordering, and atomic synchronization of an accepted snapshot. Test rapid edits during a running job, cancellation before dispatch and during execution, late success or failure, preference disable, and load or model switch. Assert that an older job cannot update the design, alerts, termination, or job status. |
| React integration Jest | Exercise the existing setting and status UI. Check pending, running, cancelled, failure, and successful completion. Verify invalid or partial text sends no command and that feature-disabled Compression Spring and other models keep their existing behavior. |
| Native C++ | If the Auto Search budget adds a search option, test deterministic cap accounting, termination, and baseline preservation on cancellation. Re-run existing manual Search and Seek fixtures with the defaults. |
| Real Wasm Worker | Add a current-model Auto Search fixture through the actual client, runtime, adapter, and compiled Wasm, following the startup worker test. Compare final values, objective, and termination with the independent oracle. Test supersession during actual optimization and verify the next edit still recalculates promptly and the stale result never applies. Retain US/Metric startup, Tutor 3 Search, and all five Tutor 7 Seek regression gates. |
| Chrome acceptance | Verify visible recalculation before Auto Search completion, rapid edits and slider drags, disable/cancel while running, load during a job, and manual Search/Seek. Record timings and compare visible values, constraints, alerts, and messages. Repeat the rebased Tutor 7 walkthrough and follow the Chrome handoff instructions in `AGENTS.md`. |

## Exit criteria

A current Compression Spring edit recalculates and can launch one
deterministic, bounded Auto Search. Cancelling or superseding a job leaves
the latest recalculated design intact and lets the next edit proceed.
The UI reflects the current job, and measured browser latency meets the
recorded targets. Run the full frontend suite with `ODOP_WASM_MODULE` set,
backend Mocha, native CTest, standalone Wasm tests, and the Wasm-enabled
production build. Record the results and browser evidence here before
moving on to Stage 9.
