# Stage 2 handoff — Compression Spring state and persistence hydration

## Completed

- Read and followed `docs/Architecture/computational-engine-wasm-plan.md`,
  `HANDOFF0.md`, and `HANDOFF1.md`.
- Added the portable Compression Spring persistence/state API in
  `cpp/core/include/odop/compression_spring_state.hpp` and its implementation
  in `cpp/core/src/compression_spring_state.cpp`.
  - The versioned contract has `design_type = "Spring/Compression"` and
    schema version `1`.
  - It defines extended numeric slots (value, validity limits, constraint
    levels, scale-denominator limit, and min/max flags) and extended text
    slots.
  - `FlatDesign`/`FlatSymbol` is a host-normalized model-state contract. This
    keeps JSON, React, Redux, browser APIs, and Wasm APIs out of the portable
    C++ core; the JavaScript adapter normalizes persisted JSON into it.
  - Hydration returns both authoritative numerical state and a UI-facing view
    containing stable IDs, locations, values, flags, and constraints.
  - Snapshot serialization returns stable identifiers rather than persisted
    offsets, retaining named values, flags, constraints, limits, and schema
    metadata.
- Implemented the complete 54-symbol Compression Spring mapping at the
  current compatibility layout: six numeric `P` slots and 48 `X` slots. String
  configuration/catalog/calculated values remain text slots even though they
  share the existing `X` offset layout.
- Hydration rejects an incompatible design type, unsupported schema version,
  unknown symbols, duplicate symbols, and type-mismatched values with
  structured diagnostic text instead of exceptions.
- Added `cpp/tests/compression_spring_state_test.cpp` and registered it as a
  second CTest executable. It proves, among other mappings:
  - `Wire_Dia -> P[1]`;
  - `Rate -> X[2]`;
  - `Material_Type ->` numeric table-index `X[25]`;
  - complete 54-symbol value/flag/constraint-preserving hydration and
    snapshot round trip;
  - a `DesignSession` owning the Compression Spring model and system controls;
  - schema-version rejection.
  Hydration now rejects a partial Compression Spring table rather than silently
  accepting default-valued missing slots.
- Added `odop::DesignSession` in `cpp/core/include/odop/design_session.hpp`
  and its portable implementation. It owns one selected `DesignModel` and the
  shared `odop::SystemControls`, exposing control query and atomic replacement.
  Stage 2 proves this only with the new Compression Spring `Model` holder in
  `cpp/models/compression_spring/include/odop/compression_spring_model.hpp`.
  `SystemControls` defaults match `client/src/initialSystemControls.js`; they
  are session-owned rather than Compression Spring state, so later objective,
  scaling, and search ports have explicit C++ inputs without global state.
  `create_session(FlatDesign, SystemControls)` is the C++ host boundary that
  hydrates Compression Spring model state and constructs its `DesignSession`.
- Added the client-owned UI schema and an additive hydration adapter in
  `client/src/computation/compressionSpringSchema.js`:
  - it derives versioned static presentation metadata from the existing
    Compression Spring `initialState` rather than duplicating it in C++ or
    saved designs;
  - it preserves the legacy 54-symbol computational prefix, including the 25
    configuration slots that do not themselves declare `type: "equationset"`;
  - it merges persisted mutable symbol state with the current UI schema while
    retaining controls, units, table references, visibility, tooltips, and
    linked-validity metadata; and
  - it selects distinct US and Metric source schemas by the persisted `units`
    value, so metric symbols retain metric units, limits, and material table
    references; it is not connected to Redux yet, so it does not alter the
    product path.
  - it normalizes a missing/incomplete persisted `system_controls` object with
    the common JavaScript defaults while retaining every saved override.
  - `normalizeCompressionSpringSavedDesign` converts the legacy v13 ODOP
    envelope into a versioned C++ hydration payload while retaining labels,
    result metadata, units, and diagnostics for the client.
- Added `client/src/__test__/Spring/Compression/compressionSpringSchema.test.js`
  to verify the complete 54-symbol schema, numeric table controls, UI-metadata
  restoration, mutable-value preservation, unknown-symbol diagnostics, legacy
  v13 envelope normalization, and complete US/Metric startup-envelope shapes.
- Inspected representative US and Metric saved startup designs. Their legacy
  envelope contains `jsontype`, `type`, string version `"13"`, `units`, 54
  `symbol_table` records, 24 `labels`, `system_controls`, and `result`.
  Their symbol records additionally preserve `smin`, `smax`, `vmin`, and
  `vmax`. The C++ extended numeric slots and flat serialization now retain
  those scale-denominator and violation fields, with round-trip coverage.

## Verification

Completed successfully:

```sh
cmake -S cpp -B /private/tmp/odop-stage2-build -DODOP_BUILD_NATIVE_TESTS=ON
cmake --build /private/tmp/odop-stage2-build
ctest --test-dir /private/tmp/odop-stage2-build --output-on-failure
```

Both native tests passed: the pre-existing Piston-Cylinder smoke test and the
new Compression Spring state/session test.

The Stage 0 compatibility fixture also passed:

```sh
cd client && CI=true npm test -- --runInBand baseline-fixtures.test.js
```

`CI=true` is required in this checkout because non-CI Jest watch mode hit the
host file-descriptor limit (`EMFILE`). The only test output otherwise was the
existing stale `caniuse-lite` advisory.

The UI-schema adapter test also passed with the same command:

```sh
cd client && CI=true npm test -- --runInBand compressionSpringSchema.test.js baseline-fixtures.test.js
```

The final focused client run completed with 6 passing tests; the native CTest
run completed with 2 passing tests.

## Next stage

Stage 3 should port the Compression Spring `EQNSET` into the portable C++ core
using named C++ offsets while retaining the exact 6-P / 48-X layout. It should
evaluate the active Compression Spring model through its `DesignSession` and
read any applicable numerical tolerances from session controls. Use the Stage
0 direct fixture as its compatibility oracle, then add the native and Wasm
differential tests described in the architecture plan. The hydration layer is
intentionally calculation-free; it must remain that way so Stage 4 can add
`INIT` separately.
