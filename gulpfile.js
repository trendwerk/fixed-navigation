'use strict';

/**
 * Require dependencies
 */
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    beep = require('beepbeep'),
    plumber = require('gulp-plumber'),
    lint = require('gulp-eslint');

/**
 * Setup files to watch
 */
var files = [
  'src/**/*.js',
  '!gulpfile.js',
  '!node_modules/**/*.*'
];

/**
 * Error handling
 */
var gulp_src = gulp.src;

gulp.src = function() {
  return gulp_src.apply(gulp, arguments)

  .pipe(plumber(function(error) {
    beep();
  }));
};

/**
 * JavaScript lint
 */
gulp.task('lint', function() {
  return gulp.src(files)

  // Lint
  .pipe(lint())

  // Report errors
  .pipe(lint.format())

  // Make reporter fail task on error
  .pipe(lint.failAfterError())
});

/**
 * Compile
 */
gulp.task('js', ['lint'], function() {
  return gulp.src(files)

  // Babel
  .pipe(babel({
    presets: ['es2015']
  }))

  // Write output
  .pipe(gulp.dest('dist/'))
});

/**
 * Watch
 */
gulp.task('default', function() {
  gulp.watch(files, ['lint', 'js']);
});
