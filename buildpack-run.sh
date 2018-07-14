#!/bin/bash
# This is buildpack-run.sh
echo "In buildpack-run.sh"
which git
git describe
node ./scripts/createVersion.js
echo $?
ls -al src/version.js
cat src/version.js
