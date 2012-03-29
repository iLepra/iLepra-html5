default: minify

# top level target

minify: clean
	@echo 'Minifying existing js ...'
	minifyjs js-src/lepra/lepra.js js-src/lepra/lepra.util.js js-src/lepra/lepra.ui.js js-src/lepra/lepra.post.js js-src/lepra/lepra.profile.js js-src/lepra/lepra.sub.js js-src/lepra/lepra.gov.js js-src/lepra/lepra.chat.js js-src/lepra.min.js
	minifyjs js-src/js/templates.js js-src/js/device.js js-src/js/main.js js-src/js/counters.js js-src/js/handlers.js js-src/js/mystuff.js js-src/js/inbox.js js-src/js/navbar.js js-src/js/posts.js js-src/js/comments.js js-src/js/more.js js-src/js/favs.js js-src/js/profile.js js-src/js/subs.js js-src/js/gov.js js-src/js/chat.js js-src/logic.min.js
	@echo 'Moving minified js into place ...'
	mv js-src/lepra.min.js assets/www/lepra/
	mv js-src/logic.min.js assets/www/js/
	@echo 'Finished!'

clean:
	rm -f js-src/*.min.js
	rm -f assets/www/js/*.js
	rm -f assets/www/lepra/*.js