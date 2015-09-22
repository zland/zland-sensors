'use strict';

var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');

var _heading, _speed;

var NextHeadingStore = assign({}, ChangeEventEmitter, {
  getNextHeading: function() {
    return _heading;
  }
});

NextHeadingStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case Constants.NEXT_HEADING:
      _heading = action.heading;
      NextHeadingStore.emitChange();
      break;
  }
}

module.exports = NextHeadingStore;
