/*global module:false*/
module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
    concat: {
        ilepra: {
            src: ['js-src/lepra/lepra.js', 'js-src/lepra/lepra.util.js', 'js-src/lepra/lepra.ui.js', 'js-src/lepra/lepra.post.js',
                  'js-src/lepra/lepra.profile.js', 'js-src/lepra/lepra.sub.js', 'js-src/lepra/lepra.gov.js', 'js-src/lepra/lepra.chat.js'],
            dest: 'js-src/lepra.js'
        },
        logic: {
            src: ['js-src/js/templates.js', 'js-src/js/device.js', 'js-src/js/main.js', 'js-src/js/counters.js', 'js-src/js/handlers.js',
                  'js-src/js/mystuff.js', 'js-src/js/inbox.js', 'js-src/js/navbar.js', 'js-src/js/posts.js', 'js-src/js/comments.js',
                  'js-src/js/more.js', 'js-src/js/favs.js', 'js-src/js/profile.js', 'js-src/js/subs.js', 'js-src/js/gov.js', 'js-src/js/chat.js'],
            dest: 'js-src/logic.js'
        }
    },
    min: {
        ilepra: {
            src: ['js-src/lepra.js'],
            dest: 'js-src/lepra.min.js'
        },
        logic: {
            src: ['js-src/logic.js'],
            dest: 'js-src/logic.min.js'
        }
    },
    uglify: {
        mangle: {toplevel: false},
        squeeze: {dead_code: false}
    }
});

// Default task.
grunt.registerTask('default', 'concat min');

};