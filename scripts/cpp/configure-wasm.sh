#!/bin/sh
set -eu

emcmake cmake -S cpp -B cpp/build/wasm -DODOP_BUILD_NATIVE_TESTS=OFF -DODOP_BUILD_WASM=ON -DCMAKE_BUILD_TYPE=Release
