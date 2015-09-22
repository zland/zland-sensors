/**
 * @deprecated
 *
 */
var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');
var MapConstants = require('map/Constants');
var SmallStepMovement = require('sensors/services/SmallStepMovement');

var ACCURACY_ACCEPTANCE_LEVEL = 35,
    DELAY_BETWEEN_POSITION_CHANGE = 3000;

var _position, _moveSpeed = 0, _lastHeading, _lastPosition = null, _lastPositionChangeTimestamp = 0;

function isNewPositionChangeAllowed() {
  return Date.now() > (_lastPositionChangeTimestamp + DELAY_BETWEEN_POSITION_CHANGE);
}

var AccuratePositionStore = assign({}, ChangeEventEmitter, {
  getCoords: function() {
    return _position;
  },

  getMoveSpeed: function() {
    return _moveSpeed:
  }
});

AccuratePositionStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case MapConstants.MAP_PROJECTION:
      _projection = action.projection;
      break;
    case Constants.SENSORS_HEADING:
      _lastHeading = action.heading;
      break;
    case Constants.SENSORS_POSITION:
      var position = action.position;
      if (position.coords.accuracy < ACCURACY_ACCEPTANCE_LEVEL && isNewPositionChangeAllowed()) {

        // forward initial position directly
        if (_lastPosition === null) {
          _lastPosition = position;
          _position = position;
          AccuratePositionStore.emitChange();
          break;
        }

        _lastPositionChangeTimestamp = Date.now();

        SmallStepMovement.cancel()
        .calculate(_projection, position, _lastPosition, _lastHeading)
        .onChange(function(position, speed) {
          _position = position;
          _moveSpeed = speed;
          AccuratePositionStore.emitChange();
        });
      }
      break;
  }
});
