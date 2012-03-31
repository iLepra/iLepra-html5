default: minify

# top level target

minify: clean
	@echo 'Minifying existing js ...'
	grunt
	@echo 'Moving minified js into place ...'
	mv js-src/lepra.min.js assets/www/lepra/
	mv js-src/logic.min.js assets/www/js/
	rm -f js-src/*.js
	@echo 'Finished!'

clean:
	rm -f js-src/*.js
	rm -f assets/www/js/*.js
	rm -f assets/www/lepra/*.js