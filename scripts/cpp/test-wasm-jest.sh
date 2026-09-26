#!/bin/sh
set -eu

"$(dirname "$0")/build-wasm.sh"
cd client
ODOP_WASM_MODULE=../cpp/build/wasm/odop_wasm.mjs CI=true npm test -- --runInBand src/__test__/Spring/Compression/wasmCompressionSpringDemoTutor.test.js
