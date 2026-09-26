# Stage 5 handoff — objective, constraints, and scales

## Completed

- Added portable objective types in `cpp/core/include/odop/optimization.hpp`.
  `Problem` is a compiled, numerical-only list of P/X descriptors; it has no
  Redux, React, DOM, or symbol-name lookup in the evaluation loop.
- Added `compile_problem(const DesignSession&)` and
  `evaluate(DesignSession&, const Problem&)` in
  `cpp/core/src/optimization.cpp`.
  - descriptors retain validity limits, constraint levels, scale denominators,
    flags, source, and offset;
  - evaluation writes min/max violations back to the session-owned numeric
    slots and returns objective, invalid/infeasible state, and diagnostics;
  - objective penalty uses `SystemControls::violation_weight`.
- Ported the baseline validity and constrained-side penalty rules from
  `pxUpdateObjectiveValue.js`, including combined validity-plus-feasibility
  penalties.
- Ported the special fixed-dependent penalty rule exactly: a fixed dependent
  value is a double-sided constraint, with squared penalty at or below one and
  capped linear penalty above one.
- Ported `sclden` as `scale_denominator(...)` and
  `recompute_scales(DesignSession&)`. Fixed targets use `fixed_weight`; normal
  constraints use `constraint_weight`; both honor `small_number` and `sdlim`.
- Added `cpp/tests/objective_test.cpp`, covering feasible, constrained, and
  invalid-plus-constrained independent-variable cases. The latter explicitly
  proves the legacy combined penalty is squared: validity 1 plus feasibility
  3 produces objective 16. It also covers fixed-dependent zero, squared, and
  linear penalties and its scale denominator.

## Verification

```sh
cmake -S cpp -B /private/tmp/odop-stage5-build -DODOP_BUILD_NATIVE_TESTS=ON
cmake --build /private/tmp/odop-stage5-build
ctest --test-dir /private/tmp/odop-stage5-build --output-on-failure
```

All 4 native CTests passed. `git diff --check` also passed.

```sh
cd client
CI=true npm test -- --watchAll=false src/__test__/Spring/Compression/demo1.test.js
cd ..
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:test:wasm
```

The legacy Compression Spring demo test passed. The Wasm module rebuilt and
both Piston-Cylinder and Compression Spring Wasm smoke tests passed.

## Live-site compatibility oracle

- The public File > Export operation generates a `Startup.json` design
  export without requiring sign-in. Its JSON includes `objective_value`.
- Treat `https://odop.herokuapp.com/` as the behavioral oracle. For each
  representative fixture, record the exported P/X values, Fix states,
  constraints, violations, feasibility state, and `objective_value`; the
  C++ and Wasm results must match those recorded live-site values.

## Stage 5 status

Stage 5 is complete: C++ compiles the numerical optimization descriptors,
derives scales from session controls, evaluates validity/constraint/fixed
violations without Redux or UI traversal in the evaluation loop, and records
the results in session-owned slots.

The next task is Stage 6: add the Compression Spring merit specification and
port Hooke-Jeeves. As the Worker integration begins, add checked-in public
`Startup.json` exports as end-to-end fixtures; their `objective_value` is the
authoritative deployed-site comparison target.
