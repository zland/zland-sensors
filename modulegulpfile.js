'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var util = require('util');
var browserSync = require('browser-sync');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require('./webpack.config.js');

gulp.task('default', function () {
  gulp.start('serve');
});

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;

  browserSync.instance = browserSync.init(files, {
    startPath: 'index.html',
    port: 7000,
    server: {
      baseDir: baseDir,
      middleware: [],
      routes: routes
    },
    files: ["www/build/**/*.js"],
    browser: browser
  });
}

gulp.task('serve', ['webpack'], function () {
  browserSyncInit([
      './www'
    ], [
    ],
    'google chrome'
  );
});

gulp.task('webpack', function(callback) {
    var isCallbackCalled = false;

    webpack(webpackConfig, function(err, stats) {
        if (err) {
            reject(new gutil.PluginError("execWebpack", err));
        }
        util.log("[execWebpack]", stats.toString({
            colors: true
        }));

        if (!isCallbackCalled) {
          callback();
          isCallbackCalled = true;
        }
    });
});

gulp.task('serve:e2e', ['wiredep', 'injector:js', 'injector:css'], function () {
  browserSyncInit(['.tmp', 'src'], null, []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit('dist', null, []);
});
