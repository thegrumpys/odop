#!/bin/bash
echo "BEGIN Build..."
npm install
npm run harp-compile
npm run heroku-postbuild
rsync -avz --delete /home/mikmil36/build/odop/client/build/* /home/mikmil36/springdesignsoftware.org/odop
echo "END Build..."
