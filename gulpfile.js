var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var browserReporter = require('postcss-browser-reporter');
var autoprefixer = require('autoprefixer');

/** 
 * file paths stored in variables
 * ex. gulp.src(input) === gulp.src('./css/*.css')
 */
var input = './src/css/*.css';
var output = './dest/css';

// Static Server + watching scss/html files
gulp.task('serve', function() {
    browserSync.init({
        server: "./dest"
    });
    gulp.watch(input, ['style']);
    gulp.watch('./dest/css/*.css').on('change', browserSync.reload);
});


gulp.task('style', function() {
    return gulp.src(input)
        .pipe(postcss([
            stylelint({
                reporters: [{
                    formatter: 'verbose',
                    console: true
                }, ]
            }),
            reporter({
                clearMessages: true
            })
        ])).pipe(gulp.dest(output));
});
gulp.task('default', ['serve']);
