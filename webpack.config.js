var autoprefixer = require('autoprefixer');
var fileListPlugin = require('./js/lib/filelist-json-webpack-plugin');
var env = process.env.NODE_ENV;

var fileListConfig = {
  key: 'posts',
  path: './posts'
}
if (env === 'production') {
  fileListConfig.exclude = 'others';
}

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
      loader: "babel"
    }, {
      test: /\.less$/,
      exclude: /(node_modules)/,
      loader: "style!css!postcss!less"
    }]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ],
  plugins: [
    new fileListPlugin(fileListConfig)
  ]
};
