var gulp = require('gulp')
var babel = require('gulp-babel')
var plumber = require('gulp-plumber')

gulp.task('src', function() {
  return gulp.src("./src/**/*.js")
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest("./"))
})

gulp.task('build', [ 'src' ], function() {})
