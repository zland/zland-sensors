var Promise = require('bluebird');
var SensorActionCreators = require('sensors/actions/SensorActionCreators');

var DIFF_THRESHOLD = 300;
var SEND_SMOOTH_THRESHOLD = 10;
var TIME_BETWEEN_SMOOTH_TRIGGER = 20;


var continuousHeading = null, diffAddition = 0, previousHeading = 0, diff = 0,
    heading = 0, smoothHeading = 0, _promise = null, _listener;

function sendChangeEvent() {
  SensorActionCreators.nextHeading(heading);
}

function calculateSmoothHeading() {
  var i, j, ref, ref1, ref2, steps;

  if (Math.abs(Math.abs(continuousHeading) - Math.abs(smoothHeading)) < SEND_SMOOTH_THRESHOLD) {
    return;
  }
  steps = continuousHeading < smoothHeading ? -2 : 2;
  _promise = Promise.resolve();
  for (i = j = ref = smoothHeading, ref1 = continuousHeading, ref2 = steps; ref2 > 0 ? j <= ref1 : j >= ref1; i = j += ref2) {
    _promise = _promise.then(function() {
      return new Promise(function(resolve, reject) {
        return setTimeout(function() {
          smoothHeading = smoothHeading + steps;
          sendChangeEvent();
          return resolve();
        }, TIME_BETWEEN_SMOOTH_TRIGGER);
      });
    }).cancellable();
  }
  _promise["catch"](Promise.CancellationError, function() {
    return null;
  });
}

function calculateContinuosHeading() {
  if (continuousHeading === null) {
    return continuousHeading = heading;
  }
  return continuousHeading = heading + diffAddition;
}

var SmoothHeading = {
  init: function(positioningHeading) {
    var add, diff, heading;

    if (_promise) {
      _promise.cancel();
    }

    heading = positioningHeading.magneticHeading * -1;
    diff = heading - heading;
    if (Math.abs(diff) >= DIFF_THRESHOLD) {
      add = diff > 0 ? -360 : 360;
      diffAddition+= add;
    }

    calculateContinuosHeading();
    calculateSmoothHeading();
  },

  onChange: function(listener) {
    _listener = listener;
  }
};


module.exports = SmoothHeading;
