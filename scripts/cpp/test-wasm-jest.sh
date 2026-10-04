#!/bin/sh
set -eu

"$(dirname "$0")/build-wasm.sh"
cd client
ODOP_WASM_MODULE=../cpp/build/wasm/odop_wasm.mjs CI=true REACT_APP_ENABLE_COMPRESSION_SPRING_WASM=true npm test -- --runInBand src/__test__/Spring/Compression/wasmCompressionSpringDemoTutor.test.js src/__test__/Spring/Compression/wasmCompressionSpringTutor3Search.test.js src/__test__/Spring/Compression/wasmCompressionSpringSeek.test.js
