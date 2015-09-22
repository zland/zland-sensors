
var SmoothHeading = require('./SmoothHeading');
var SensorActionCreators = require('sensors/actions/SensorActionCreators');

var ACCURACY_ACCEPTANCE_LEVEL = 35,
    DELAY_BETWEEN_POSITION_CHANGE = 3000;

var _positionStore, _headingStore, _mapStore, _lastPositionChangeTimestamp;

function isNewPositionChangeAllowed() {
  return Date.now() > (_lastPositionChangeTimestamp + DELAY_BETWEEN_POSITION_CHANGE);
}

function serviceAction() {
  var latestPosition = _positionStore.getLatestPosition();
  if (latestPosition.coords.accuracy < ACCURACY_ACCEPTANCE_LEVEL && isNewPositionChangeAllowed()) {

    // cannot calculate steps
    if (_positionStore.getPreviousPosition() === null) {
      return;
    }

    _lastPositionChangeTimestamp = Date.now();

    SmoothHeading.cancel()
    .calculate(
      _mapStore.getProjection(),
      _positionStore.getLatestPosition(),
      _positionStore.getPreviousPosition(),
      _headingStore.getLatestHeading()
    )
    .onChange(function(position, speed) {
      SensorActionCreators.nextStep(position, speed);
    });
  }
}

var NextStepService = {
  start: function(positionStore, headingStore, mapStore) {
    _mapStore = mapStore;
    _headingStore = headingStore;
    _positionStore = positionStore;
    _positionStore.addChangeListener(serviceAction);
  },

  stop: function() {
    _positionStore.removeChangeListener(serviceAction);
    SmoothHeading.cancel();
  }
};

module.exports = NextStepService;
