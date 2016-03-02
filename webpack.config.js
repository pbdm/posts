var path = require('path');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var webpack = require('webpack');

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
var posts = {
  wiki: tree('./posts/wiki'),
  blog: tree('./posts/blog')
};

module.exports = {
  entry: { 
    js: './js/app.js'
  }, 
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    loaders:[{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "babel",
      query: {
        optional: ['runtime']
      }
    }, {
      test: /\.scss$/,
      exclude: /(node_modules)/,
      loader: "style!css!postcss!sass"
    }]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ],
  plugins: [
    //new CleanWebpackPlugin(distPath, {
      //root: __dirname,
      //verbose: true, 
      //dry: false
    //}),
    new HtmlWebpackPlugin({
      template: 'tmpl/index.html',
      filename: 'index.html',
      hash: true
    }),
    new webpack.DefinePlugin({
      posts: JSON.stringify(posts)
    })
  ]
};
