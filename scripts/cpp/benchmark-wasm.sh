#!/bin/sh
set -eu

"$(dirname "$0")/build-wasm.sh"
node cpp/benchmarks/wasm-compression-spring-recalculation.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
node cpp/benchmarks/wasm-compression-spring-demo-tutor.mjs "$PWD/cpp/build/wasm/odop_wasm.mjs"
