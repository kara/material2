#!/bin/bash

set -e

echo ">>> Build Material"
rm -rf dist
gulp build:devapp

echo ">>> Rebuild dev-app with ngtsc"
node_modules/.bin/ngc -p src/dev-app/tsconfig-build.json

echo ">>> Bundle demo-app with SystemJS"
node ./src/dev-app/systemjs-bundle.js

echo ">>> Assembling app"
mkdir dist/demo
cp dist/packages/dev-app/bundle.js dist/demo
cp src/dev-app/index.html dist/demo
cp dist/packages/dev-app/theme.css dist/demo
cp 'node_modules/@webcomponents/custom-elements/custom-elements.min.js' dist/demo
cp node_modules/core-js/client/core.js dist/demo
cp node_modules/systemjs/dist/system.src.js dist/demo
cp node_modules/zone.js/dist/zone.js dist/demo
cp node_modules/hammerjs/hammer.min.js dist/demo

echo ">>> Done."
echo "Output: $(pwd)/dist/demo"