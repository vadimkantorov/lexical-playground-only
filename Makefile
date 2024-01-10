.PHONY: assets
assets:
	-rm -rf assets packages/lexical-playground/build
	npm install --prefix packages/lexical-playground babel @rollup/plugin-babel @babel/plugin-transform-flow-strip-types @babel/preset-react # these are missing dependencies: --package-lock-only --no-package-lock 
	npm install --prefix packages/lexical-playground
	npm run --prefix packages/lexical-playground build-prod
	cp -r packages/lexical-playground/build/assets .
	cp assets/main.*.js  assets/main.js
	cp assets/main.*.css assets/main.css
