# ODOP Computational Engine Architecture and Migration Plan

## Status and purpose

This document defines the target architecture for ODOP's engineering calculation and optimization capability.  It is grounded in the current application and uses **Compression Spring** as the first full implementation.  The aim is not a general rewrite of the React application.  It is a deliberate extraction of the numerical engine into portable C++ that can run natively and as WebAssembly (Wasm), while preserving ODOP's responsive, spreadsheet-like design workflow.

Piston-Cylinder remains a useful small test model for proving toolchain and binding mechanics, but it is not the architectural benchmark.  Compression Spring is the reference model because it exercises initialization, mixed calculation data, material and end-type lookup, dependent values, constraints, scales, objective evaluation, Hooke-Jeeves search, autosearch, persistence, and the user-facing symbol table.

Geometry and FreeCAD integration are deliberately out of scope for the first implementation.  The C++ core will be portable enough to support them later, but this plan prioritizes ODOP's browser calculation and optimization workflow.

## Current system: facts to retain

The current client is React 18 and Redux.  The client build uses `react-app-rewired`; the repository requires Node 20.  Compression Spring presently contains:

- UI/persisted symbol definitions in `client/src/designtypes/Spring/Compression/initialState.js`.
- Symbol-table offsets in `symbol_table_offsets.js`.
- Calculation-vector offsets in `offsets.js`.
- JavaScript `init(p, x)` and `eqnset(p, x)` functions.
- Material and end-type tables used by `init`.
- Jest fixtures, including direct equation-set tests.

The current Redux dispatcher is the reactive coordinator.  A symbol edit is reduced into the React state model, then the dispatcher conditionally invokes `INIT`, invokes `EQNSET`, propagates related values, updates scale denominators and the objective, and performs checks.  Search clones Redux state into a shadow store and repeatedly causes the computational path to traverse symbol-table state.  This is correct behaviorally but makes the tight numerical loop dependent on UI infrastructure.

Compression Spring currently creates six independent numerical inputs in `P`:

`OD_Free`, `Wire_Dia`, `L_Free`, `Coils_T`, `Force_1`, and `Force_2`.

It creates 48 `X` entries.  `X` contains dependent/calculated values, global configuration values, lookup-derived values and some strings such as material file and process.  Existing offsets and saved designs are compatibility assets and must be treated as such.

## Architectural goals

1. Make C++ the owner of numerical model state, initialization, equation evaluation, constraints/objective evaluation, and Hooke-Jeeves optimization.
2. Compile the same portable C++ calculation core natively for fast tests and to WebAssembly for the browser.
3. Keep React responsible for editing, presentation, reports, help, layout, and persistence interaction.
4. Preserve the spreadsheet behavior: an engineering edit recalculates the affected design state; **autosearch** optionally runs an optimization after that calculation.
5. Make the calculation core host-independent so another system can integrate it without Redux, React, or browser APIs.
6. Preserve current numerical behavior first; change engineering formulas, penalties, scales, and solver behavior only through explicit later decisions backed by tests.
7. Make Compression Spring the complete first vertical slice before porting the other models.

## Non-goals for the first implementation

- Replacing the complete React UI or all Redux state at once.
- Dynamic loading of arbitrary C++ model binaries in the browser.
- A geometry/BRep implementation or FreeCAD optimizer.
- Altering formulas merely to make them look more object-oriented.
- Replacing Hooke-Jeeves with another optimizer.
- Reformatting or invalidating existing saved designs without a migration path.

## Target ownership and data partition

The persistent design remains a flat, combined symbol table.  It deliberately contains values, fixed/free state, constraint information, validity limits, and other calculation-related information, much as ODOP's current saved symbol table does.

At runtime, that flat representation is bifurcated into two views:

```text
Persisted combined symbol table
  stable IDs/names, values, flags, constraints, limits, preferences
               |
               +--> UI symbol schema/view
               |      labels, units, formatting, help, controls, layout,
               |      storage reference P[n] or X[n]
               |
               +--> C++ computational state
                      session-owned system controls, active model, extended
                      P and X slots, resources, compiled objective
```

The combined symbol table is the portable persistence contract.  At runtime, extended `P` and `X` state is authoritative for calculation and optimization.  React can keep a renderable mirror/snapshot, but it is not an independent calculation source of truth.

Offsets are not a durable persisted identity.  Each persisted symbol needs a stable identifier or name.  A versioned Compression Spring schema maps it to its current `P` or `X` offset when a design is loaded.  This allows an offset layout to evolve without silently mapping an old saved value to the wrong quantity.

### Extended slots

Numerical slots require more than a `double`:

```text
value
valid minimum / maximum
constraint minimum / maximum
minimum / maximum scale denominator
flags: constrained, fixed, linked/derived, etc.
current violations and optional diagnostics
```

`P` slots are numerical independent variables.  `X` supports numerical and text/configuration slots.  In the initial implementation, the existing `P`/`X` ordering is retained.  `EQNSET` accesses values by named C++ offsets and does not know about symbol names, Redux, or React.

A per-design `DesignSession` owns the active model and `SystemControls`; neither is process-global. System controls are application preferences in UI and persistence terms, but numerical controls such as `smallnum`, objective weights, step/tolerance values, and maximum iterations are explicit C++ inputs. A session exposes control query and atomic replacement/update operations. Presentation controls are preserved and echoed even when they do not affect calculation.

## C++ component design

```text
odop-core                 portable C++20 library
  state/                  DesignSession, system controls, extended P/X slots
  model/                  abstract model contract and model registry
  optimization/           objective, constraints, scales, Hooke-Jeeves
  resources/              immutable material/end-type data interfaces

odop-compression-spring   portable C++20 model library
  compression state/schema mapping
  init
  eqnset
  objective/constraint adapter

odop-wasm                 Emscripten-only adapter
  narrow host API and JavaScript-facing bindings

client                    existing React application
  Worker client, UI schema/view, Redux result mirror, persistence bridge
```

The base model contract should express operations, not UI details. `DesignSession` owns one selected model; Stage 2 proves this only with Compression Spring rather than generalizing additional models:

```text
initialize(state, resources) -> status
evaluate(state, objectiveProblem) -> evaluation
optimize(state, objectiveProblem, searchControls, cancellation) -> result
```

`evaluate` runs `EQNSET` and evaluates compiled constraints/objective.  `optimize` calls `initialize` once when required, keeps initialized global `X` state stable, varies only free `P` entries, evaluates candidate states internally, and runs a final `EQNSET` before returning.

### Model registry and pluggability

The initial Wasm module statically includes known ODOP models and uses a model registry keyed by a stable model identifier such as `compression-spring`.  This is the practical browser form of plug-in support.  Runtime C++ dynamic-library loading is not a first-phase browser requirement.

The portable core must not include Emscripten headers, `emscripten::val`, React types, Redux types, DOM calls, browser fetches, or JavaScript callbacks.  Host-specific code belongs only in adapters.

## Objective, constraints, scaling, and search

Before an evaluation or search, the host compiles the current extended state into an `OptimizationProblem`.  It contains only numerical descriptors needed in the loop:

```text
source: P or X
offset
validity limits
constraint/fixed flags
constraint levels
precomputed scale denominators
penalty and system-control settings
optional model-specific merit specification
```

The scaling rules currently derive `smin` and `smax` from constraint levels, fixed/constraint weights, `sdlim`, and `smallnum`.  Their current numerical behavior must be reproduced.  The first C++ port can receive finalized scales from the hydration compiler, then later centralize scale construction after equivalence is proven.

Within the tight loop, candidate evaluation is entirely numerical:

```text
candidate free P values
  -> merge with fixed P values
  -> copy initialized X baseline into candidate X
  -> EQNSET
  -> constraint penalties + merit
  -> objective, feasibility, diagnostics
```

No symbol-table scan, Redux dispatch, React render, JavaScript merit callback, or Wasm boundary crossing occurs per candidate.

The initial Hooke-Jeeves port preserves current parameters and behavior: starting values, step behavior, `del`, `delmin`, `objmin`, tolerance, maximum iteration policy, sign alternation, and termination messages.  Any desired solver improvement is a separate, measured project.

## Worker and WebAssembly architecture

The browser runs Wasm calculations in a dedicated Web Worker.  The main React thread never waits synchronously for ordinary recalculation or autosearch.

```text
React/Redux UI                  Worker
------------                   -----------------------------
user action -> command ----->  hydrate/apply state transaction
render pending state            classify change impact
                               INIT if required
                               EQNSET + objective/checks
result patch <--------------   return revisioned state/result

autosearch command ----------> run Hooke-Jeeves entirely in Wasm
final result <---------------  final EQNSET + diagnostics
```

Use a revision number for every user-visible state change.  Worker responses include the base and resulting revision.  React applies a response only when it corresponds to the current compatible revision.  A new relevant edit cancels, or at minimum makes stale, an older autosearch job.

The Worker protocol should use typed commands such as:

```text
hydrateDesign(persistedDesignEnvelope, schemaVersion)
applyChanges(changes, revision)
setSystemControls(changes, revision)
getSystemControls(revision)
recalculate(revision)
autosearch(searchControls, revision)
cancel(jobId)
snapshot(revision)
```

`applyChanges` is transactional.  A material-table selection that changes several symbols should become one Worker transaction and one calculation pass, rather than recursively dispatching multiple changes and recalculating after every intermediate state.

For JavaScript bindings, expose a small host API rather than the complete C++ inheritance graph.  A C-compatible handle API is a stable option; Embind is acceptable for a carefully bounded façade.  In either case, React should use a handwritten JavaScript Worker client that exposes domain operations, not raw C++ pointers or Wasm memory.

Build Emscripten output as a modular ES module (`.mjs`) and load it within the Worker.  This keeps generated runtime globals out of the application and makes initialization asynchronous and explicit.

## Spreadsheet recalculation and autosearch

Every engineering edit follows a change-impact rule supplied by the model schema:

| Changed state | Required work |
|---|---|
| Independent `P` value | `EQNSET`, objective, checks |
| Global/configuration `X` value such as material, property method, or end type | `INIT`, `EQNSET`, objective, checks |
| Fixed/free flag, constraint level, scale, or objective control | objective and checks; a full `EQNSET` may be conservatively run for uniform UI behavior |
| Label, units, tooltip, formatting, or layout | no computation |

Autosearch is the optional extension of normal recalculation:

```text
edit -> initialize when needed -> EQNSET -> objective/checks
     -> [autosearch enabled] Hooke-Jeeves -> final EQNSET -> result
```

Coalesce slider movements and debounce valid text-entry commits.  Do not send incomplete textual numbers into the numerical engine.  Define explicit budgets for autosearch: maximum evaluations, cancellation latency, and a user-visible pending/running state.  Optimization results must never overwrite a later edit.

## Persistence, loading, and migration

The persisted design is an envelope containing JSON type, design type, legacy version, units, a combined symbol table, labels, system controls, and result metadata. The normalized computational payload includes a `designType` and `schemaVersion`, plus each symbol's stable ID/name and persisted computational attributes. Retain unknown fields during migrations where possible so older application extensions do not lose information.

Loading sequence:

1. Read and validate the persisted design envelope.
2. Migrate its legacy form to the current Compression Spring persistence schema.
3. Select the US or Metric UI schema and resolve symbols by stable identifier into UI entries and `P`/`X` slots.
4. Create a `DesignSession` with the selected model and the persisted system controls.
5. Load immutable resources required by `INIT`.
6. Run `INIT`, `EQNSET`, scale construction, objective evaluation, and checks.
7. Return a reconciled snapshot and diagnostics to the UI.

Persisted calculated values may be retained for compatibility, but the result after this reconciliation is authoritative.  Invalid or unavailable resource selections must produce structured diagnostics rather than a browser exception.

## Migrating the current dispatcher

The current dispatcher contains valuable behavior.  It should be cataloged before replacement, not discarded.  Classify each branch and helper into one of these destinations:

| Current responsibility | New home |
|---|---|
| React action/reducer by symbol name | UI command and render-state update |
| Calculation-affecting propagation | Worker state transaction / model rules |
| `INIT`, `EQNSET`, objective, scale, checks | C++ core |
| Catalog/UI formatting and presentation rules | React UI layer |
| Search/shadow-store path | C++ Hooke-Jeeves engine |
| Analytics/logging | React host after result receipt |

The public UI action vocabulary can remain recognizable during transition—change symbol value, fix/free, change constraint, load, search/autosearch—while middleware changes from directly calculating through Redux to issuing a Worker command and applying its result patch.

## Toolchain, languages, scripts, and files

### Languages

- **C++20:** numerical core, Compression Spring, constraints/objective, solver, native unit tests.
- **JavaScript:** React UI, Redux integration, Worker protocol/client, persistence migration, Wasm integration tests.
- **JSON:** material/end-type resources initially; flat persisted designs; golden fixtures.
- **CMake:** C++ build graph for native and Emscripten configurations.

### Required tools

- Node.js **20 LTS**, consistent with the repository `package.json` engines field.
- npm, using the existing root and `client` package scripts.
- A C++20 compiler for native work: current Clang or GCC.
- CMake and a fast backend such as Ninja.
- Emscripten SDK (`emcmake`, `emcc`) pinned to a documented version for reproducible Wasm builds.
- A C++ test framework, preferably GoogleTest or Catch2.  Select one and standardize it; do not mix frameworks without a reason.
- Existing Jest/React test tooling for Worker and UI integration tests.
- A browser automation tool only if real-worker/browser tests cannot be covered sufficiently by Node and Jest; Playwright is the preferred addition if needed.

### Proposed scripts

Add scripts incrementally; names below are a target, not a requirement to add all immediately:

```text
scripts/cpp/configure-native.sh       CMake native configuration
scripts/cpp/build-native.sh           build core and native tests
scripts/cpp/test-native.sh            run C++ tests
scripts/cpp/configure-wasm.sh         Emscripten CMake configuration
scripts/cpp/build-wasm.sh             build .mjs + .wasm client artifact
scripts/cpp/test-wasm.sh              run Wasm contract tests
scripts/cpp/check-fixtures.js         compare JS and C++ golden results
```

The React client should gain commands such as `npm run wasm:build`, `npm run test:wasm`, and a combined CI command.  Generated `.wasm` and Emscripten glue output are build artifacts, not hand-edited source.  The existing root `npm test` and `client/npm test` remain in place.

### Proposed source layout

```text
cpp/
  CMakeLists.txt
  core/include/odop/
  core/src/
  models/compression_spring/include/
  models/compression_spring/src/
  wasm/src/
  tests/
  fixtures/

client/src/
  computation/
    worker.js
    workerClient.js
    protocol.js
    symbolStateAdapter.js
```

This is additive.  Existing JavaScript model files remain the compatibility oracle until the C++ path is proven.

## Testing and numerical compatibility

Testing is the migration safety mechanism.

1. **Native C++ unit tests:** slot behavior, `INIT`, `EQNSET`, constraint evaluation, scaling, optimizer behavior, error cases.
2. **Golden fixtures:** complete Compression Spring `P`, `X`, resources, controls, expected outputs, objective, and diagnostics.  Begin with current `eqnset.test.js` data and representative tutorial/demo designs.
3. **Cross-language differential tests:** run JavaScript and C++ with the same fixture.  Compare text exactly and numeric values with declared absolute/relative tolerances.
4. **Wasm contract tests:** import the generated module, hydrate state, calculate, optimize, cancel, and verify returned snapshots.
5. **React Worker integration tests:** verify revision handling, stale-result rejection, autosearch enablement, and UI update behavior.
6. **Performance benchmarks:** record native and Wasm time per `EQNSET`, per objective evaluation, and per representative autosearch.  Benchmark in CI only when stable enough; otherwise retain versioned local benchmark reports.

The first compatibility milestone is not merely “same final answer.”  It is matching `INIT` output, `EQNSET` output, objective terms, constraints, final search state, objective, and termination condition for representative designs.

## Step-by-step migration plan

### Stage 0 — Capture and freeze the behavioral baseline

1. Create this architecture document and obtain agreement on ownership, scope, and terminology.
2. Inventory every Compression Spring symbol: stable ID, current symbol-table index, `P`/`X` location, type, current flags, constraints, scale data, and change impact.
3. Inventory dispatcher behavior: table expansion, catalog reset, propagation, fixed/free behavior, checks, and resource lookup.
4. Select representative initial state, tutorials, demos, catalog entries, valid designs, invalid designs, and search examples as fixtures.
5. Record today’s numerical results and termination messages before any formula changes.

**Exit criterion:** versioned fixtures exist and existing JavaScript tests still pass.

### Stage 1 — Establish the C++ build without changing the product

1. Add `cpp/` and CMake with a C++20 target for `odop-core`.
2. Add native compiler configuration and a chosen C++ test framework.
3. Add the Emscripten configuration that produces a minimal modular `.mjs`/`.wasm` artifact.
4. Use Piston-Cylinder only as a smoke test: compile one trivial calculation natively and to Wasm, call it from a Node/Wasm test, and verify the build/release pipeline.
5. Do not redesign React or port the solver in this stage.

**Exit criterion:** one native and one Wasm test run in repeatable scripts, with no product behavior changed.

### Stage 2 — Define Compression Spring state and persistence hydration

1. Implement the Compression Spring schema mapping from stable flat-symbol identifiers to current `P`/`X` offsets.
2. Define extended numeric and text `P`/`X` slots, including persisted scale denominators and current violations.
3. Define the persisted Compression Spring design envelope: JSON type, model type, legacy version, units, symbol table, labels, system controls, and result metadata.
4. Add a JavaScript migration/normalization adapter from the legacy saved-design envelope to the versioned C++ hydration payload, preserving UI-only envelope data.
5. Add a portable `DesignSession` that owns one selected model and shared `SystemControls`; it provides control query and atomic update operations. Prove it only with Compression Spring in this stage.
6. Implement client-owned, versioned US and Metric UI schemas, then hydrate a renderable UI view by combining the selected schema with persisted mutable state.
7. Implement model-state serialization/snapshot output and schema-version validation.
8. Write mapping and compatibility tests using representative US and Metric saved designs. Prove `Wire_Dia -> P[1]`, `Rate -> X[2]`, numeric table-index configuration values, system-control preservation, and unit-specific UI-schema selection.

**Exit criterion:** a persisted US or Metric Compression Spring design can migrate into a `DesignSession` and round-trip its intended named values, flags, constraints, scale/violation state, and system controls; the client can reconstruct the current unit-appropriate UI view without using C++ for presentation metadata.

### Stage 3 — Port Compression Spring EQNSET

1. Port `offsets.js` to named C++ offsets with the exact initial layout.
2. Port the JavaScript compression `eqnset.js` line for line where practical; evaluate the active Compression Spring model through its `DesignSession`, sourcing numerical tolerances from session controls where the legacy behavior uses them. Avoid cleanup changes that obscure numerical comparison.
3. Add direct C++ golden tests using current `eqnset.test.js` cases.
4. Add JavaScript-to-C++ differential tests.
5. Bind only a narrow `evaluate` smoke API to Wasm and verify the same fixtures through generated Wasm.

**Exit criterion:** native C++ and Wasm `EQNSET` agree with the JavaScript reference within declared tolerances.

### Stage 4 — Port INIT and model resources

1. Convert material and end-type tables into immutable resources available to C++.
2. Remove Redux/store interaction from the computational initialization path; initialize the active model in its `DesignSession` and return state changes and diagnostics instead.
3. Port Compression Spring `init.js`, preserving current property-method and end-type behavior.
4. Test initialization independently and then test `INIT -> EQNSET` fixtures.
5. Define and test the change-impact metadata that decides when `INIT` is needed.

**Exit criterion:** configuration changes such as material and end type produce the same resulting calculation state as the existing application.

### Stage 5 — Port objective, constraints, scales, and checks

1. Turn symbol-table constraint data into compiled `OptimizationProblem` descriptors.
2. Read weights and numerical controls from session-owned `SystemControls`, not from Redux or model-global state.
3. Port the current violation and penalty rules from `pxUpdateObjectiveValue.js` before attempting simplification.
4. Preserve current `smin`/`smax`, weights, validity rules, fixed dependent targets, and check behavior.
5. Return structured diagnostics rather than dispatching UI actions within calculations.
6. Compare complete objective results against current JavaScript for valid, infeasible, and invalid fixtures.

**Exit criterion:** C++ reproduces objective/violation results without a Redux store or symbol-table traversal in the evaluation loop.

### Stage 6 — Port Hooke-Jeeves search

1. Port `patsh` and the candidate evaluation path into C++.
2. Read search parameters and evaluation limits from the `DesignSession` `SystemControls`.
3. Make free/fixed `P` selection part of the compiled optimization problem.
4. Use initialized `X` as the immutable baseline and a candidate working state per evaluation.
5. Implement cooperative cancellation checks and evaluation-count limits.
6. Reproduce current termination conditions and create search regression fixtures.

**Exit criterion:** native C++ search reaches compatible final states/objectives/termination reasons for selected Compression Spring searches.

### Stage 7 — Add the Wasm Worker and React bridge

1. Build the Wasm artifact in the client build pipeline.
2. Implement Worker protocol, module initialization, revision IDs, cancellation, system-control query/update commands, and state snapshots.
3. Add a Worker-backed calculation client alongside the existing dispatcher path behind a feature flag.
4. On feature-enabled designs, mirror current React actions into Worker transactions and apply returned patches to Redux.
5. Test stale results, cancellation, hydration, normal recalculation, and error reporting.

**Exit criterion:** normal Compression Spring calculation runs in a Worker/Wasm path and produces the same visible result as the legacy JavaScript path.

### Stage 8 — Enable autosearch

1. Expose the session `enable_auto_search` control through the user-facing autosearch setting, plus pending/running/cancelled states.
2. Define debounce/coalescing behavior for text entry and sliders.
3. Invoke C++ optimization as a single Worker job after the normal recalculation state is coherent.
4. Apply an optimizer result only for the current revision.
5. Measure user-perceived latency and tune budgets without changing mathematical behavior.

**Exit criterion:** autosearch is responsive, cancellable, deterministic for a fixture, and cannot overwrite a newer edit.

### Stage 9 — Retire duplicated legacy computation deliberately

1. Compare telemetry and regression results for the legacy and Worker paths.
2. Make the Worker path default for Compression Spring after acceptance testing.
3. Keep a short-term fallback during rollout if operationally useful.
4. Remove obsolete shadow-store numerical execution only after fixture and production confidence is sufficient.
5. Apply the proven model contract to Extension Spring, Torsion Spring, Solid, and then Piston-Cylinder as appropriate.

**Exit criterion:** Compression Spring calculation and optimization no longer depend on Redux internals, while existing UI and persistence behavior remain supported.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Silent numerical drift | Golden fixtures, differential tests, explicit tolerances, line-oriented initial port |
| Old designs map to wrong values | Stable symbol IDs, schema versions, load-time migration and mapping tests |
| Excessive autosearch work | Worker isolation, coalescing, cancellation, evaluation budgets, revision checks |
| UI and Worker disagree | One authoritative Worker computation state; atomic returned state patches |
| Material/resource mismatch | Immutable resource versions included in test fixtures and diagnostics |
| Premature abstraction | Compression Spring first; keep base interfaces small and prove them before porting other models |
| Wasm build friction | Native C++ tests first, pinned Emscripten version, one smoke model before the full spring port |

## Definition of success

The first implementation succeeds when a user can edit a Compression Spring design in React, receive spreadsheet-like recalculation from a Wasm Worker, enable autosearch, and obtain the same engineering outcomes as the current application—while all `INIT`, `EQNSET`, objective, constraint, and Hooke-Jeeves work occurs in portable C++ without consulting Redux or the UI symbol table during the numerical loop.
