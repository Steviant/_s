var gulp        = require('gulp');
var sass        = require('gulp-sass');
var neat        = require('node-neat').includePaths;
var normalize   = require('node-normalize-scss').includePaths;
var browserSync = require('browser-sync').create();
var prompt      = require('gulp-prompt');

var paths = {
    scss: './scss/**/*.scss'
};

gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['styles'].concat(neat, normalize)
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default',function(){
    gulp.start('styles');
});
