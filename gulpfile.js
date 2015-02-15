var gulp = require('gulp');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var less = require('gulp-less');

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
  runSequence('build:js', 'build:css', 'webserver', 'watch', cb);
});

