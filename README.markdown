# [WIP ] lexical-playground-only

The idea is to have https://github.com/facebook/lexical/tree/main/packages/lexical-playground as a separate, lean repo bundlable as a single JS file to be used as a simple client-side markdown editor with usage API similar to https://github.com/quilljs/quill (and usable in vanilla HTML/JS without mandatory usage of package managers/bundlers/react)

Based on the broken release https://github.com/facebook/lexical/releases/tag/v0.12.5: https://github.com/facebook/lexical/discussions/5392

```shell
git clone git@github.com:vadimkantorov/lexical-playground-only.git
cd lexical-playground-only

# wget https://github.com/facebook/lexical/archive/refs/tags/v0.12.5.tar.gz
# tar -xf v0.12.5.tar.gz --strip-components=1 lexical-0.12.5/packages/lexical-playground lexical-0.12.5/packages/shared
# sed -i "s@alias: moduleResolution@alias: [ { find: 'shared', replacement: path.resolve('../shared/src') } ]@" packages/lexical-playground/vite.prod.config.js
# git add -A -f packages
# git commit -a -m 'extracting only packages/lexical-playground and packages/shared'

cd packages/lexical-playground
npm install
npm install babel @rollup/plugin-babel @babel/plugin-transform-flow-strip-types @babel/preset-react
npm run build-prod
cd build
python3 -m http.server
```
