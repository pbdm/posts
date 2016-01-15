var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var jeditor = require('gulp-json-editor');
var fs = require('fs');
var gulpif = require('gulp-if');
var path = require('path');
var env;
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

var tree = function(filepath) {

  filepath = path.normalize(filepath);

  var result = [];

  var files = fs.readdirSync(filepath);

  for (key in files) {
    file = files[key];
    if (files[key].substr(-2,2) === 'md') {
      result.push ({
        date:  files[key].substr(0,10),
        fullpath:  encodeURIComponent(filepath + '/' + files[key]),
        path: encodeURIComponent(files[key].slice(11,-3).toLowerCase()),
        title: files[key].slice(11,-3)
      });
    }
  }

  return result;
}

gulp.task('build:js', function() {
  return gulp.src('js/app.js')
    .pipe(gulpWebpack(require('./webpack.config.js')))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
  return gulp.src('./css/style.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(postcss([ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ]))
    .pipe(gulpif(env === 'prod', minifycss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('manifest:wiki', function () {
  return gulp.src("dist/wiki.json")
  .pipe(jeditor(function(json) {
    return tree('posts/wiki');
  }))
  .pipe(gulp.dest("dist"));
});

gulp.task('manifest:blog', function () {
  return gulp.src("dist/blog.json")
  .pipe(jeditor(function(json) {
    return tree('posts/blog');
  }))
  .pipe(gulp.dest("dist"));
});

gulp.task('default', function(cb) {
  env = 'dev'
  runSequence(['manifest:wiki', 'manifest:blog'], ['build:js', 'build:css'], cb);
});

gulp.task('build', function(cb) {
  env = 'prod'
  runSequence(['manifest:wiki', 'manifest:blog'], ['build:js', 'build:css'], cb);
});
