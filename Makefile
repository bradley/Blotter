VENDOR_FILES = \
	lib/objectKeys.js \
	lib/packer/packer.growing.js \
	lib/detector/Detector.js \
	lib/event_emitter/EventEmitter.js \

GENERATED_FILES = \
	blotter.js \
	blotter.min.js

yui-jar =  /usr/local/bin/yuicompressor

all: $(GENERATED_FILES)

.PHONY: clean all

src/start.js: package.json bin/start
	bin/start > $@

blotter.js: $(shell node_modules/.bin/smash --ignore-missing --list src/blotter.js) $(VENDOR_FILES) package.json
	@rm -f $@
	node_modules/.bin/smash src/blotter.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	# Combine vendor files and built blotter.js file into temp file.
	@cat $(VENDOR_FILES) $@ > build_tmp.js
	# Output combined files back into blotter.js
	@cat build_tmp.js > $@
	@rm -f build_tmp.js
	@chmod a-w $@

blotter.min.js: blotter.js bin/uglify
	@rm -f $@
	bin/uglify $< > $@

clean:
	rm -f -- $(GENERATED_FILES)