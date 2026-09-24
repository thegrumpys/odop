#!/bin/sh
set -eu

"$(dirname "$0")/configure-wasm.sh"
cmake --build cpp/build/wasm
