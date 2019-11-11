// Karma configuration
// Generated on Tue Jun 06 2017 21:11:25 GMT-0300 (-03)
const webpackConfig = require('./webpack.config')

const webpackTestConfig = Object.assign({}, webpackConfig[0])
webpackTestConfig.entry = null
webpackTestConfig.externals = {}
// webpackTestConfig.output.filename = '[name].js'

module.exports = function(config) {
  config.set({


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-sinon'
    ],

    // list of files / patterns to load in the browser
    files: [
      'test/*.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],

    webpack: webpackTestConfig,


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.spec.js': ['webpack'],
      'src/*.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [!process.env.TRAVIS ? 'Chrome' : 'Chrome_travis_ci'],


    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
