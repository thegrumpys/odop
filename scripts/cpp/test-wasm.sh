#!/bin/sh
set -eu

"$(dirname "$0")/build-wasm.sh"
node cpp/tests/wasm-piston-cylinder.test.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/tests/wasm-compression-spring.test.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/tests/wasm-compression-spring-startup.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/tests/wasm-compression-spring-session.test.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/tests/wasm-compression-spring-tutor3-search.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/tests/wasm-compression-spring-seek.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
