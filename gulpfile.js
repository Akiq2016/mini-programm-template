const gulp = require('gulp')
const del = require('del')
const babel = require("gulp-babel");

gulp.task('clean:dist', done =>
  del(['dist'])
)

gulp.task('build:js', done =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
)

gulp.task('build:others', done =>
  gulp.src(['src/**/*.*', '!src/**/*.js'])
    .pipe(gulp.dest('dist'))
)

gulp.task('watch:src', done =>
  gulp.watch('src/**/*.*', gulp.series('clean:dist', 'build:others', 'build:js'))
)

gulp.task('default', gulp.series('clean:dist', 'build:others', 'build:js'))