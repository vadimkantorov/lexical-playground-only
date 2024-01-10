.PHONY: assets
assets:
	-rm -rf assets packages/lexical-playground/build
	cd packages/lexical-playground && npm install && npm install babel @rollup/plugin-babel @babel/plugin-transform-flow-strip-types @babel/preset-react --save && npm run build-prod
	cp -r packages/lexical-playground/build/assets .
	cp assets/main.*.js  assets/main.js
	cp assets/main.*.css assets/main.css
