#!/bin/sh
set -eu

cmake -S cpp -B cpp/build/native -DODOP_BUILD_NATIVE_TESTS=ON -DODOP_BUILD_WASM=OFF
