const webpack = require('webpack')
const path = require('path')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const minimize = !!process.env.MINIMIZE
const packageName = 'clappr-stats'

let configurations = []

const webpackConfig = (config) => {
  return {
    mode: config.mode || 'none',
    devtool: config.devtool || 'source-maps',
    entry: path.resolve(__dirname, 'src/clappr-stats.js'),
    externals: {
      '@clappr/core': 'Clappr'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ],
    },
    resolve: {
      plugins: [
        new DirectoryNamedWebpackPlugin(true),
      ],
      extensions: ['.js']
    },
    plugins: [
      ...(config.plugins || [])
    ],
    optimization: config.optimization,
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'latest/',
      filename: config.filename,
      library: 'ClapprStats',
      libraryTarget: 'umd',
    },
    devServer: {
      contentBase: 'public/',
      host: '0.0.0.0',
      disableHostCheck: true,
      hot: true
    }
  }
}

configurations.push(webpackConfig({
  filename: `${packageName}.js`,
  mode: 'development'
}))

if (minimize) {
  console.log('NOTE: Enabled minifying bundle (uglify)')
  const loaderOptions = new webpack.LoaderOptionsPlugin({ minimize, debug: !minimize })

  const uglify = new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {},
      mangle: true,
      sourceMap: true,
      comments: false,
      output: { comments: false }
    },
  })

  configurations.push(webpackConfig({
    filename: `${packageName}.min.js`,
    plugins: [
      loaderOptions,
    ],
    optimization: {
      minimizer: [
        uglify,
      ],
    },
    mode: 'production'
  }))
}

module.exports = configurations
