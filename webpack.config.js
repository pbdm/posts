var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var fileListPlugin = require('filelist-json-webpack-plugin');

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
    new fileListPlugin({
      key: 'posts',
      paths: {
        wiki: './posts/wiki',
        blog: './posts/blog'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'tmpl/index.html',
      filename: 'index.html',
      hash: true
    }),
    //new webpack.DefinePlugin({
      //posts: JSON.stringify(posts)
    //})
  ]
};
