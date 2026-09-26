# Stage 6 handoff — modified Hooke–Jeeves search

## Active implementation

- Added `SearchResult` and `patsh(DesignSession&, const Problem&)` to the
  portable optimization API.
- The C++ search path is deliberately independent of the legacy Redux shadow
  store and symbol table:
  - free independent-variable offsets are compiled once from `Problem`;
  - fixed P values remain in the session baseline;
  - each candidate restores a full initialized P/X baseline, changes only the
    free P entries, runs Compression Spring `EQNSET`, then evaluates the
    compiled objective;
  - no React, Redux, symbol names, or JavaScript callbacks cross the numerical
    search loop.
- The first port preserves the documented ODOP/MIT modifications in
  `client/src/store/middleware/patsh.js`: 1.05 pattern extrapolation,
  alternating exploration signs, 1.9 step reduction, `OBJMIN`, `MAXIT`, and
  tolerance termination rules, including legacy termination wording.

## Verification so far

```sh
cmake --build /private/tmp/odop-stage6-build
ctest --test-dir /private/tmp/odop-stage6-build --output-on-failure
```

The six native tests pass and `git diff --check` passes. The search regression
proves that Search moves a free P variable to feasibility, preserves a fixed P
variable, evaluates from its P/X baseline, and returns the no-free-P message.

With Emscripten activated, `npm run cpp:test:wasm` rebuilt the module and both
existing Wasm smoke tests passed.

## Equation-set regression cleanup

- Added `odop-compression-spring-stage0-fixture-test`. It reads the same
  versioned `docs/Architecture/fixtures/compression-spring/stage0/eqnset.json`
  used by the JavaScript baseline-fixture test, rather than copying expected
  values into another source of truth.
- The C++ fixture test executes the normal vector and all three intentional
  singular vectors (spring-index-one, zero-active-coils, and
  zero-mean-diameter), including their NaN/Infinity expectations.
- The JavaScript direct `eqnset.test.js` and `baseline-fixtures.test.js` also
  pass. Demo and tutorial tests remain workflow-level Redux/UI scenarios; they
  are not direct equation-set vectors and belong to the Stage 7 bridge suite.

## Stage 6 status

Stage 6 is complete for normal Search. `patsh` is the direct C++ port of the
ODOP/MIT-modified Hooke–Jeeves search, operating solely on compiled numerical
data and session state.

Seek merit is deliberately separate: it is a model-specific objective term,
not part of ordinary feasibility Search. Stage 7 Worker integration should add
public `Startup.json` search fixtures from `odop.herokuapp.com`; their exported
`objective_value`, final P values, and termination messages are the end-to-end
compatibility oracle. Cooperative cancellation is also naturally exposed with
the Stage 7 Worker job protocol.
