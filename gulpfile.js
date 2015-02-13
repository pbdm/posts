var gulp = require('gulp');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');

gulp.task('build', function(){
  return gulp.src('js/app.js')
    .pipe(webpack({
      output: {
        filename: "app.js"
      },
      module: {
        loaders:[{ test: /\.js$/, loader: "jsx-loader" }]
      }
    }))
    .pipe(gulp.dest('webjs'));
});

gulp.task('watch', function(){
  gulp.watch(['js/*.js', 'js/*/*.js'], ['build']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: 'http://127.0.0.1:8000/'
    }));
});

gulp.task('default', function(cb){
  runSequence('build', 'webserver', 'watch', cb);
});

