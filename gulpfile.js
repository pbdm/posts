var gulp = require('gulp');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var less = require('gulp-less');
var jeditor = require('gulp-json-editor');
var fs = require('fs');
var path = require('path');


var tree = function(filepath) {

  filepath = path.normalize(filepath);

  var result = {};

  var files = fs.readdirSync(filepath);

  for (key in files) {
    file = files[key];
    if (files[key].substr(-2,2) == 'md') {
      result[files[key].slice(11,-3).toLowerCase()] = {
        date:  files[key].substr(0,10),
        fullpath:  filepath + '/' + files[key],
        path: files[key].slice(11,-3).toLowerCase(),
        title: files[key].slice(11,-3)
      }
    }
  }

  return result;
}

gulp.task('build:js', function(){
  return gulp.src('js/app.js')
    .pipe(webpack({
      output: {
        filename: "bundle.js"
      },
      module: {
        loaders:[
          { test: /\.js$/, loader: "jsx-loader" },
          //{ test: require.resolve("jquery"), loader: "expose?jQuery" },
          //{ test: require.resolve("react"), loader: "expose?React" },
          //{ test: require.resolve("react-router"), loader: "expose?Router" },
          { test: require.resolve("./js/function.js"), loader: "expose?PBDm" }
        ]
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:css', function () {
  gulp.src('./css/style.less')
    .pipe(less())
    .pipe(gulp.dest('dist'));
});

gulp.task('manifest', function () {
  gulp.src("dist/wiki.json")
  .pipe(jeditor(function(json) {
    return tree('_posts/wiki');
  }))
  .pipe(gulp.dest("dist"));
});

gulp.task('watch', function(){
  gulp.watch(['js/*.js', 'js/*/*.js'], ['build:js']);
  gulp.watch(['css/style.less'], ['build:css']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      //livereload: true,
      open: 'http://127.0.0.1:8000/'
    }));
});

gulp.task('default', function(cb){
  runSequence('manifest', 'build:js', 'build:css', 'webserver', 'watch', cb);
});

