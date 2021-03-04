const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
 
gulp.task('sass-compile', function(){
    return gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'));
})

gulp.task('html', async function() {
    gulp.src('./html/**/*.html')
        .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
        .pipe(gulp.dest('./'))
});

gulp.task('allCars', async function() {
    gulp.src('./all-cars-templates/**/*.html')
        .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
        .pipe(gulp.dest('./all-cars'))
});

gulp.task('watch', function() {
    gulp.watch('./html/**/*.html', gulp.series('html'));
    gulp.watch('./all-cars-templates/**/*.html', gulp.series('allCars'));
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'));
})