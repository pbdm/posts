var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var jeditor = require('gulp-json-editor');
var fs = require('fs');
var path = require('path');

var tree = function(filepath) {

  filepath = path.normalize(filepath);

  var result = [];

  var files = fs.readdirSync(filepath);

  for (key in files) {
    file = files[key];
    if (files[key].substr(-2,2) == 'md') {
      result.push ({
        date:  files[key].substr(0,10),
        fullpath:  filepath + '/' + files[key],
        path: files[key].slice(11,-3).toLowerCase(),
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
          ReactRouter: 'react-router',
          React: 'react',
          jQuery: 'jquery',
          $: 'jquery',
          _: 'lodash',
          marked: 'marked',
          PBDm: path.join(__dirname,'./js/function'),
          hljs: 'highlight.js'
        })
      ],
      module: {
        loaders:[
          { test: /\.js$/, loader: "jsx-loader" },
          //{ test: require.resolve("jquery"), loader: "expose?jQuery" },
          //{ test: require.resolve("react"), loader: "expose?React" },
          //{ test: require.resolve("react-router"), loader: "expose?Router" },
          //{ test: require.resolve("./js/function.js"), loader: "expose?PBDm" }
        ]
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
  return gulp.src('./css/style.scss')
    .pipe(sass())
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

gulp.task('manifest:local', function () {
  return gulp.src("dist/local.json")
  .pipe(jeditor(function(json) {
    return tree('posts/local');
  }))
  .pipe(gulp.dest("dist"));
});

gulp.task('watch', function(){
  gulp.watch(['js/*.js', 'js/*/*.js'], ['build:js']);
  gulp.watch(['css/style.scss'], ['build:css']);
  gulp.watch(['post/*/*.*'], ['build:css']);
});

gulp.task('webserver', function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: '7000',
      open: 'http://127.0.0.1:7000/'
    }));
});

gulp.task('default', function(cb){
  runSequence(['manifest:wiki', 'manifest:blog', 'manifest:local'], 'build:js', 'build:css', 'webserver', 'watch', cb);
});

