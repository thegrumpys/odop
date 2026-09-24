# ODOP portable computational engine

Stage 1 establishes a deliberately small C++20 build boundary. `odop-core` is
host-independent and Piston-Cylinder is only a smoke model for native and Wasm
toolchain validation; it does not replace any React or Redux calculation path.

## Requirements

- CMake 3.20 or newer and a C++20 compiler for native builds.
- Node.js 20 LTS for the Wasm contract test.
- Emscripten SDK **3.1.73** for Wasm builds. Configure the SDK environment so
  `emcmake` and `emcc` are on `PATH`.

The native test framework is CTest. The smoke test is a self-contained C++
executable to avoid adding a test-framework dependency before the core has a
larger test surface.

## Commands

From the repository root:

```sh
scripts/cpp/test-native.sh
scripts/cpp/test-wasm.sh
```

The Wasm build generates `cpp/build/wasm/odop_wasm.mjs` and its adjacent
`odop_wasm.wasm`; both are ignored build artifacts. The generated module has a
narrow C-compatible smoke API and is imported by the Node contract test.
