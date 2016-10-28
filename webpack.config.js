var autoprefixer = require('autoprefixer');

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
  postcss: [ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ]
};
