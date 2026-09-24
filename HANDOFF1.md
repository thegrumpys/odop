# Stage 1 handoff — C++20 and Wasm smoke build

## Completed

- Read and followed `docs/Architecture/computational-engine-wasm-plan.md` and
  `HANDOFF0.md`.
- Added an additive C++20 CMake project under `cpp/`:
  - `odop-core` is a portable static library with no React, Redux, DOM, or
    Emscripten dependencies.
  - A deliberately small Piston-Cylinder calculation reproduces the existing
    JavaScript equations for area, force, and stress. It is solely a Stage 1
    toolchain smoke model, not a product-path migration.
  - CTest is the selected native test framework. Its self-contained executable
    verifies the existing US startup calculation.
- Added Emscripten-only `odop_wasm` configuration. It produces a modular ES
  module (`odop_wasm.mjs`) and adjacent `.wasm` artifact with a narrow C API;
  it exports only the smoke calculation and allocation helpers needed by the
  Node contract test.
- Added repeatable scripts and root npm aliases:
  - `scripts/cpp/test-native.sh` / `npm run cpp:test:native`
  - `scripts/cpp/test-wasm.sh` / `npm run cpp:test:wasm`
- Added `cpp/README.md`, including the pinned Emscripten SDK version (3.1.73),
  prerequisites, and generated-artifact behavior. Added `cpp/build/` to
  `.gitignore`.

## Verification completed locally

- Native C++ smoke calculation compiled and ran successfully with:

  ```sh
  clang++ -std=c++20 -Icpp/core/include cpp/core/src/piston_cylinder.cpp cpp/tests/piston_cylinder_test.cpp -o /private/tmp/odop-stage1-native-smoke && /private/tmp/odop-stage1-native-smoke
  ```

- `node --check cpp/tests/wasm-piston-cylinder.test.mjs` passed.
- `cd client && npm test -- --runInBand baseline-fixtures.test.js` passed:
  1 suite / 1 test. The only output besides the pass was the existing stale
  `caniuse-lite` Browserslist advisory.
- `git diff --check` passed.

## Full toolchain verification

With CMake 4.4.3, Node 20.20.2, and Emscripten 3.1.73 installed on the macOS
development machine, the repeatable scripts completed successfully:

```sh
npm run cpp:test:native
npm run cpp:test:wasm
```

- Native CMake configured with AppleClang 21.0.0 and CTest passed 1/1 test.
- Emscripten configured and built `odop_wasm.mjs`; the following Node contract
  test completed without error (it is intentionally silent on success):

  ```sh
  node cpp/tests/wasm-piston-cylinder.test.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
  ```

No React product files or existing Compression Spring fixture expectations were
changed.

## Next stage

Stage 2 should define Compression Spring runtime state and persistence hydration:
the schema mapping from stable symbol IDs to the preserved P/X offsets, extended
numeric/text slots, snapshot serialization, schema-version validation, and
mapping tests. Keep Piston-Cylinder isolated as the Stage 1 smoke model.
