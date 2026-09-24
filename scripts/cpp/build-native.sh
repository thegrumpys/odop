#!/bin/sh
set -eu

"$(dirname "$0")/configure-native.sh"
cmake --build cpp/build/native
