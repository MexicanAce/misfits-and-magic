PATH_TO_FINAL_OUTPUT := ~/code-commit/nvillanueva/src/misfits-and-magic/

build:
	npm run build
	rm -r $(PATH_TO_FINAL_OUTPUT)* || true
	cp -a dist/. $(PATH_TO_FINAL_OUTPUT)
	cd $(PATH_TO_FINAL_OUTPUT)
	git add .
	git commit -m "Updates to misfits and magic"
	git push
	cd -
