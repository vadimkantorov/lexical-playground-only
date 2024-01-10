.PHONY: assets
assets:
	pushd packages/lexical-playground
	-rm -rf build
	npm install
	npm install babel @rollup/plugin-babel @babel/plugin-transform-flow-strip-types @babel/preset-react --save
	npm run build-prod
	cp build/assets/main.*.js build/assets/main.js
	cp build/assets/main.*.css build/assets/main.css
	cp -r build/assets ../../
	popd
