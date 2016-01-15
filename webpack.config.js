module.exports = {
  entry: './js/app.js',
  output: {
    filename: 'bundle.js'
  },
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
};
