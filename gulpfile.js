const gulp = require('gulp')
const del = require('del')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const rename = require('gulp-rename')

gulp.task('clean:dist', done =>
  del(['dist'])
)

gulp.task('eslint:js', done =>
  gulp.src(['src/**/*.js', '!src/libs/promise.js', '!src/libs/regenerator.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)

gulp.task('build:js', done =>
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
)

gulp.task('build:css', done =>
  gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(rename(path => {
      path.extname = '.wxss'
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('build:html', done =>
  gulp.src('src/**/*.html')
    .pipe(rename(path => {
      path.extname = '.wxml'
    }))
    .pipe(gulp.dest('dist'))
)

gulp.task('build:others', done =>
  gulp.src(['src/**/*.*', '!src/**/*.js', '!src/**/*.scss', '!src/**/*.html'])
    .pipe(gulp.dest('dist'))
)

// run 'gulp watch:src'
gulp.task('watch:src', done =>
  gulp.watch('src/**/*.*', gulp.series('build:others', 'eslint:js', 'build:js', 'build:css', 'build:html'))
)

// run 'gulp'
gulp.task('default', gulp.series('clean:dist', 'build:others', 'eslint:js', 'build:js', 'build:css', 'build:html'))
