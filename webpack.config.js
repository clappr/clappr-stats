var webpack = require('webpack');
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
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'latest/',
    filename: 'clappr-stats.js',
    library: 'ClapprStats',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: 'public/',
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true
  }
};