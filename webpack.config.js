/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack'),
    path = require('path');

module.exports = {

  output: {
    filename: 'main.js',
    path: __dirname + '/www/build',
    publicPath: 'build/'
  },

  context: __dirname + "/www",

  cache: true,
  watch: true,
  watchDelay: 500,
  debug: true,
  devtool: 'cheap-source-map',
  entry: './test.jsx',

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    moduleDirectories: ['node_modules'],
    extensions: ['', '.js', '.coffee', '.scss', '.css', '.json', '.jsx'],
    alias: {
      // 'styles': __dirname + '/src/styles',
      // 'mixins': __dirname + '/src/mixins',
      // 'components': __dirname + '/src/components/',
      'backbone': __dirname + '/node_modules/backbone/backbone.js',
      'underscore': __dirname + '/node_modules/underscore/underscore.js',
      'jquery': __dirname + '/node_modules/jquery/dist/jquery.js',
      bluebird: __dirname + '/node_modules/bluebird/js/browser/bluebird.min',
      'bootstrap': __dirname + '/node_modules/bootstrap',
      'fontawesome': __dirname + '/node_modules/font-awesome',
      'handlebars': __dirname + '/node_modules/handlebars/dist/handlebars',
      'moment': __dirname + '/node_modules/moment/min/moment.min',
      'jquery-translate3d': __dirname + '/node_modules/jquery-translate3d/jquery-translate3d.js',
      'whenjs': __dirname + '/node_modules/when',
      'react': __dirname + '/node_modules/react/dist/react-with-addons',

      // assets
      'assets': __dirname + '/www/assets',


      // zland modules
      'core': __dirname + '/node_modules/zland-core',
      'console': __dirname + '/node_modules/zland-console',
      'crosshair': __dirname + '/node_modules/zland-crosshair',
      'game': __dirname + '/node_modules/zland-game',
      'generator': __dirname + '/node_modules/zland-generator',
      'map': __dirname + '/node_modules/zland-map',
      'player': __dirname + '/node_modules/zland-player',
      'weapon': __dirname + '/node_modules/zland-weapon',
      'zombie': __dirname,
      'api': __dirname + '/node_modules/zland-api',
      'stats': __dirname + '/node_modules/zland-stats',
      'auth': __dirname + '/node_modules/zland-auth',
      'crypto-js': __dirname + '/node_modules/crypto-js',

      'configuration': __dirname + '/config/config'
    }
  },
  module: {
    preLoaders: [],
    loaders: [{
        test: /\.coffee$/,
        loader: "coffee-loader"
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg).*$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(json).*$/,
      loader: 'json-loader'
    }, {
      test: /\.(jsx).*$/,
      loader: 'jsx-loader'
    },

    // { test: /\.(woff|woff2).*$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    // { test: /\.ttf.*$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
    // { test: /\.eot.*$/,  loader: "file-loader" },
    // { test: /\.svg.*$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },

    {
      test: /\.scss$/,
      loader: "style!css!sass?" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules")) + "&" +
          "includePaths[]=" +
            __dirname
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        "bootstrap": "bootstrap",
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "Backbone": "backbone",
        "window.Backbone": "backbone",
        "_": "underscore"
    })
  ]

};
