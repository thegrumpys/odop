#!/bin/sh
set -eu

"$(dirname "$0")/build-native.sh"
ctest --test-dir cpp/build/native --output-on-failure
