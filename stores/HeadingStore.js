'use strict';

var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');

var MAX_HEADINGS_COUNT = 20;

var _headings = [];

var HeadingStore = assign({}, ChangeEventEmitter, {
  getHeadings: function() {
    return _headings;
  },

  getLatestHeading: function() {
    if (_headings.length === 0) {
      return null;
    }
    return _headings[_headings.length - 1];
  },

  getPreviousHeading: function() {
    if (_headings.length < 2) {
      return null;
    }
    return _headings[_headings.length - 2];
  }
});

HeadingStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {

    case Constants.SENSORS_HEADING:
      _headings.push(action.heading);
      if (_headings.length > MAX_HEADINGS_COUNT) _headings.shift();
      HeadingStore.emitChange();
      break;
  }
});

module.exports = HeadingStore;
