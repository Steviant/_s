var gulp        = require('gulp');
var sass        = require('gulp-sass');
var neat        = require('node-neat').includePaths;
var normalize   = require('node-normalize-scss').includePaths;
var browserSync = require('browser-sync').create();
var prompt      = require('gulp-prompt');
var wpPot       = require('gulp-wp-pot');
var sort        = require('gulp-sort');
var postcss     = require('gulp-postcss');
var rename      = require("gulp-rename");
var rtlcss      = require('gulp-rtlcss');
var flexibility = require('postcss-flexibility');
var cssnano     = require('cssnano');
var zip         = require('gulp-zip');
var pkg         = require('./package.json');
var wiredep     = require('wiredep').stream;

var paths = {
    scss: './scss/**/*.scss'
};

var zipDirs = [
    'inc/**/*',
    'js/*',
    'languages/*',
    'template-parts/*',
    '*.css',
    '*.php',
    '*.txt',
    '*.png',
    '!codesniffer.ruleset.xml',
    '!CONTRIBUTING.md',
    '!gulpfile.js',
    '!package.json',
    '!README.md'
];

/*******************************************************************************
 * Process the .scss files and output to the correct place.
 ******************************************************************************/
gulp.task('styles', function () {
    var processors = [
      flexibility,
      cssnano
    ];
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['styles'].concat(neat, normalize)
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
        .pipe(rtlcss()) // Convert to RTL.
        .pipe(rename({ basename: 'rtl' }))
        .pipe(gulp.dest('./'));
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
 * Creates a zip file to distribute the stage extension
 ******************************************************************************/
gulp.task('zip', function() {
    return gulp.src(zipDirs, { base: "../" })
        .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest('./dist'));

});

/*******************************************************************************
 * Goooooo!
 ******************************************************************************/
gulp.task('default',function(){
    gulp.start('serve');
});
