const gulp = require('gulp');
const fileinclude = require('gulp-file-include');

gulp.task('html', async function() {
    gulp.src('./html/**/*.html')
        .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
    gulp.watch('./html/**/*.html', gulp.series('html'))
})