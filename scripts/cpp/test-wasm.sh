#!/bin/sh
set -eu

"$(dirname "$0")/build-wasm.sh"
node cpp/tests/wasm-piston-cylinder.test.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
