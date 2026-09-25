# Stage 3 handoff — Compression Spring EQNSET

## Completed

- Read and followed the architecture plan plus `HANDOFF0.md`, `HANDOFF1.md`,
  and `HANDOFF2.md`.
- Ported the exact current Compression Spring `P` (6 values) and `X` (48
  offsets) calculation layout to C++20:
  - `cpp/models/compression_spring/include/odop/compression_spring_offsets.hpp`
    provides named C++ offsets matching the JavaScript `offsets.js` layout.
  - `cpp/models/compression_spring/src/compression_spring_eqnset.cpp` is a
    deliberately line-oriented port of the legacy `eqnset.js`, retaining its
    floating-point singular behavior (`NaN` and infinities) rather than
    sanitizing it.
  - It reads model inputs and outputs through the fixed P/X slots and reads
    the cycle-life clamp tolerance from session-owned
    `SystemControls::small_number`.
  - `odop::compression_spring::evaluate(DesignSession&)` evaluates the active
    Compression Spring model and writes the resulting values back into that
    session's authoritative runtime state. No Redux, React, DOM, or JavaScript
    dependency is present in this computational path.
- Included the immutable S-N tensile percentages currently needed by the
  legacy cycle-life calculation. The values are copied from the existing US
  and Metric material tables (whose relevant columns are identical). Stage 4
  should move this narrow transitional table into the complete immutable model
  resource layer alongside the rest of the material and end-type tables.
- Added native CTest coverage in `cpp/tests/compression_spring_eqnset_test.cpp`:
  - Stage 0 normal direct fixture values with the declared absolute/relative
    tolerance;
  - all three frozen singular cases;
  - evaluation through a `DesignSession` and active `Model` state, not only a
    standalone vector function.
- Added the narrow Stage 3 Wasm ABI in
  `cpp/wasm/src/compression_spring_bindings.cpp`:
  `odop_compression_spring_evaluate(const double* p, double* x)` accepts six P
  doubles and updates 48 X doubles in place. It does not expose C++ object
  handles or the inheritance graph.
- Added `cpp/tests/wasm-compression-spring.test.mjs`, which checks the normal
  Stage 0 golden vector through the generated Wasm artifact. The existing
  `scripts/cpp/test-wasm.sh` now runs both the Piston-Cylinder smoke test and
  this Compression Spring Wasm contract test.

## Verification

Completed successfully:

```sh
cmake -S cpp -B /private/tmp/odop-stage3-build -DODOP_BUILD_NATIVE_TESTS=ON
cmake --build /private/tmp/odop-stage3-build
ctest --test-dir /private/tmp/odop-stage3-build --output-on-failure
```

All three native tests passed, including the new Compression Spring EQNSET
test.

The existing JavaScript compatibility and Stage 2 schema tests also passed:

```sh
cd client && CI=true npm test -- --runInBand baseline-fixtures.test.js compressionSpringSchema.test.js
```

This completed with 2 suites / 6 tests passing. The only output besides test
results was the pre-existing stale `caniuse-lite` Browserslist advisory.

Wasm verification also completed successfully after activating the installed
Emscripten SDK 3.1.73:

```sh
source /Users/brianwatt/Developer/emsdk/emsdk_env.sh
npm run cpp:test:wasm
```

The generated modular `odop_wasm.mjs`/`.wasm` artifact built successfully and
both Node contract tests passed (they are intentionally silent on success):
the existing Piston-Cylinder smoke test and the new Compression Spring EQNSET
golden-vector test. Emscripten must be activated in a new shell because its
executables are not globally on this machine's default `PATH`.

## Next stage

Stage 4 should make `INIT` and complete material/end-type data immutable C++
resources. It should replace the Stage 3 S-N compatibility table with that
resource interface, port `init.js`, and verify `INIT -> EQNSET` for material,
property-method, and end-type changes. The Stage 3 evaluator must remain free
of UI and Redux access.
