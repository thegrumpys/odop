# Stage 4 handoff — Compression Spring `init` and `initUI`

## Completed

- Followed the architecture plan and prior stage handoffs, including the
  Stage 3 numerical-equivalence work.
- Split the initialization design along the requested ownership boundary:
  - C++ `odop::compression_spring::init(DesignSession&)` is calculation-only.
    It has no Redux, React, DOM, visibility, format, or input/output-mode
    dependencies.
  - JavaScript `initUI(symbolTable)` in
    `client/src/computation/compressionSpringInitUI.js` is presentation-only.
    It derives `hidden` and `input` state without altering a symbol value.
- Added immutable C++ Compression Spring resources:
  - the full current US and Metric material data needed by `init`;
  - the Compression Spring end-type table;
  - a life-category lookup for tensile endurance.
  They are private immutable C++ data accessed through the narrow resource
  functions in `compression_spring_resources.hpp`.
- Implemented calculation-side `init`:
  - for `Prop_Calc_Method == 1`, resolves material selection, ASTM/Fed Spec,
    process, density, torsion modulus, hot factor, tensile values, allowable
    stress percentages, and end-type coil constants;
  - for methods 2 and 3, deliberately leaves user-entered material properties
    untouched; and
  - returns structured diagnostics for an invalid material or end-type index
    before committing an update.
- Refactored the Stage 3 EQNSET cycle-life calculation to read the same
  immutable C++ material resource data rather than a duplicate narrow table.
- Added explicit calculation change-impact metadata to the client schema:
  configuration/resource changes require `initialize-and-evaluate`, direct
  numerical edits require `evaluate`, and presentation-only changes require
  `no-computation`.
- Extended native coverage to prove material/end-type initialization,
  `INIT -> EQNSET` compatibility for the Stage 0 reference rate, and retention
  of a user-entered property for method 3. Added JavaScript tests for all three
  `initUI` modes and user-specified end types.

## Verification

Completed successfully:

```sh
cmake -S cpp -B /private/tmp/odop-stage4-build -DODOP_BUILD_NATIVE_TESTS=ON
cmake --build /private/tmp/odop-stage4-build
ctest --test-dir /private/tmp/odop-stage4-build --output-on-failure
```

All 3 native CTests passed.

```sh
cd client && CI=true npm test -- --runInBand \
  compressionSpringInitUI.test.js compressionSpringSchema.test.js baseline-fixtures.test.js
```

All 3 suites / 9 Jest tests passed. The only non-test output was the existing
stale `caniuse-lite` advisory. `git diff --check` passed.

With Emscripten 3.1.73 activated, `npm run cpp:test:wasm` also rebuilt the
modular Wasm artifact successfully and completed its two silent-on-success
Node contract tests (Piston-Cylinder and Compression Spring).

## Important boundary note

The current Redux product path still calls its legacy combined `init.js`.
That is intentional: the new C++ `init` and JavaScript `initUI` are additive
and not connected to Redux until the Stage 7 Worker bridge. They establish the
replacement boundary without changing current user behavior. `initUI` should
be called after a Worker calculation snapshot is reconciled into the client UI
view; it must not be moved into C++.

## Next stage

Stage 5 should port objective evaluation, constraints, scales, and checks.
Compile the extended state into numerical optimization descriptors, read
weights from `DesignSession::SystemControls`, and return structured
diagnostics—without Redux or a symbol-table traversal inside the evaluation
loop.
