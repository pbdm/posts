var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var jeditor = require('gulp-json-editor');
var fs = require('fs');
var gulpif = require('gulp-if');
var path = require('path');
var rename = require("gulp-rename");
var revCollector = require('gulp-rev-collector');
var des;
var types = ['wiki', 'blog', 'local'];

var tree = function(filepath) {

  filepath = path.normalize(filepath);

  var result = [];

  var files = fs.readdirSync(filepath);

  for (key in files) {
    file = files[key];
    if (files[key].substr(-2,2) == 'md') {
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

gulp.task('build:js', function(){
  return gulp.src('js/app.js')
    .pipe(gulpWebpack({
      output: {
        filename: "bundle.js"
      },
      plugins: [
        new webpack.ProvidePlugin({
          marked: 'marked',
          PBDm: path.join(__dirname,'./js/function')
        })
      ],
      module: {
        loaders:[{
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          query: {
            optional: ['runtime']
          }
        }]
      }
    }))
    .pipe(gulpif(des == 'dist', uglify()))
    .pipe(gulp.dest(des));
});

gulp.task('build:css', function () {
  return gulp.src('./css/style.scss')
    .pipe(sass())
    .pipe(gulpif(des == 'dist', minifycss()))
    .pipe(gulp.dest(des));
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

gulp.task('manifest:local', function () {
  return gulp.src("dist/local.json")
  .pipe(jeditor(function(json) {
    return tree('posts/local');
  }))
  .pipe(gulp.dest("dist"));
});

gulp.task('copy', function(){
  return gulp.src('index.html')
  .pipe(rename('local.html'))
  .pipe(gulp.dest('./'));
});

gulp.task('revCollector', function () {
  return gulp.src(['rev.json', 'local.html'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch(['js/*.js', 'js/*/*.js'], ['build:js']);
  gulp.watch(['css/style.scss'], ['build:css']);
  gulp.watch(['post/*/*.*'], ['build:css']);
  gulp.watch(['index.html'], ['copy']);
});

gulp.task('webserver', function() {
  return gulp.src('./')
    .pipe(webserver({
      //livereload: true,
      port: '7000',
      //open: 'http://127.0.0.1:7000/'
    }));
});

gulp.task('default', function(cb){
  des = 'static'
  runSequence(['manifest:wiki', 'manifest:blog', 'manifest:local'], 'copy', 'revCollector', ['build:js', 'build:css'], 'webserver', 'watch', cb);
});

gulp.task('build', function(cb){
  des = 'dist'
  runSequence(['manifest:wiki', 'manifest:blog', 'manifest:local'], ['build:js', 'build:css'], cb);
});
