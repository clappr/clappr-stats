var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/clappr-stats.js'),
  externals: {
    clappr: 'Clappr'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-stats.js',
    library: 'ClapprStats',
    libraryTarget: 'umd',
  },
};