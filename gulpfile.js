var gulp        = require('gulp');
var sass        = require('gulp-sass');
var neat        = require('node-neat').includePaths;
var normalize   = require('node-normalize-scss').includePaths;
var browserSync = require('browser-sync').create();
var prompt      = require('gulp-prompt');
var wpPot       = require('gulp-wp-pot');
var sort        = require('gulp-sort');

var paths = {
    scss: './scss/**/*.scss'
};

/*******************************************************************************
 * Process the .scss files and output to the correct place.
 ******************************************************************************/
gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['styles'].concat(neat, normalize)
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

/*******************************************************************************
 * Processes the .php files for gettext translatable strings and outputs them to
 * a .pot file in /languages
 ******************************************************************************/
gulp.task('pot', function () {
	return gulp.src('**/*.php')
		.pipe(sort())
		.pipe(wpPot( {
			domain: '_s',
			destFile:'_s.pot',
			package: '_s',
			bugReport: 'http://steviantdesign.co',
			lastTranslator: 'Steve Mitchell <steve@steviant.co.uk>',
			team: 'Steviant Design Co. <steve@steviant.co.uk>'
		} ))
		.pipe(gulp.dest('languages'));
});

/*******************************************************************************
 * BrowserSync server, watch files for live reload / style injection
 ******************************************************************************/
gulp.task('serve', ['styles'], function() {
  browserSync.init({
      proxy: "steviant.dev" // replace with your local development environment
  });
  gulp.watch("scss/**/*.scss", ['styles']);
  gulp.watch("*.php").on('change', browserSync.reload);
});

/*******************************************************************************
 * Goooooo!
 ******************************************************************************/
gulp.task('default',function(){
    gulp.start('serve');
});
