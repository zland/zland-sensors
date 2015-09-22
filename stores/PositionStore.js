

var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');

var MAX_STORES_POSITION_COUNT = 20;

var _positions = [];

var PositionStore = assign({}, ChangeEventEmitter, {
  getPositions: function() {
    return _positions;
  },

  getLatestPosition: function() {
    if (_positions.length === 0) {
      return null;
    }
    return _position[_positions.length - 1];
  },

  getPreviousPosition: function() {
    if (_positions.length < 2) {
      return null;
    }
    return _position[_positions.length - 2];
  }
});

PositionStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case Constants.SENSORS_POSITION:
      _positions.push(action.position);

      if (_positions.length > MAX_STORES_POSITION_COUNT) _positions.shift();

      PositionStore.emitChange();
      break;
  }
});

module.exports = PositionStore;
