#!/bin/bash
# This is buildpack-run.sh
echo "Entering buildpack-run.sh"
./scripts/createVersion.js > src/version.js
echo "Exiting buildpack-run.sh code=" $?