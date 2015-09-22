'use strict';

var Promise = require('bluebird');
var Defer = require('core/Defer');
var math = require('core/math');
var GooglePoint = require('core/google/GooglePoint');
var GoogleLatLng = require('core/google/GoogleLatLng');
var SensorActionCreators = require('sensors/actions/SensorActionCreators');

var TIME_EASE_MOVEMENT = 5000;

var _listener, _position, _startPosition, _speed, _heading, _projection,
  _endPosition, _promise, _currentInterval;

function getLatLng(pixels) {
  return _projection.fromPointToLatLng(new GooglePoint(pixels.x, pixels.y));
}

function getPixels(latLng) {
  return _projection.fromLatLngToPoint(
    new GoogleLatLng(latLng.latitude, latLng.longitude)
  );
}

function getCalculatedSpeed() {
  var speed;
  speed = _position.speed;
  if (isNaN(speed)) {
    log("accurate pos: error", "speed is NaN, using default speed");
    return 0.0000007;
  } else {
    return speed / 2500000;
  }
}

function easeMovement() {
  var angle, breakImmediately, coords, defer, gpsPosition, movingFunc, radians,
      speed, timeSpend, timeoutStep, xunits, yunits;
  defer = Defer();
  defer.promise.cancellable();
  _promise = defer.promise();

  if (_lastHeading === null) {
    console.log("error, no last heading");
    defer.resolve();
    return defer.promise;
  }
  angle = -90 + _heading.magneticHeading;
  radians = angle * (Math.PI / 180);
  speed = getCalculatedSpeed();
  xunits = math.toFixed(Math.cos(radians) * speed, 7);
  yunits = math.toFixed(Math.sin(radians) * speed, 7);
  coords = getPixels(_position);
  timeSpend = 0;
  timeoutStep = 33;

  _currentInterval = setInterval(function() {
    var latLng;
    if (timeSpend >= TIME_EASE_MOVEMENT) {
      clearInterval(_currentInterval);
      return defer.resolve();
    }
    coords.x += xunits;
    coords.y += yunits;
    latLng = getLatLng(coords);
    _position = {
      latitude: latLng.lat(),
      longitude: latLng.lng()
    };
    sendChangeEvent();
    timeSpend += timeoutStep;
  }, timeoutStep);

  movingFunc();
  return defer.promise;
}

function calculateToNewPosition() {
  var cancelCorrectionOnNewGpsPosition, coordsInterval, currentCoords, defer,
      dist, moves, newGpsPosition, speed, units;

  defer = Defer();
  defer.promise.cancellable();
  _promise = defer.promise;

  speed = 0.000002;
  currentCoords = getPixels(_startPosition);
  newGpsPosition = getPixels(_endPosition);
  dist = math.distance(currentCoords, newGpsPosition, speed);
  units = math.units(math.calculateAngle(currentCoords, newGpsPosition, false), speed);
  moves = 0;

  _currentInterval = setInterval(function() {
    var latLng;
    if (moves >= dist.moves) {
      clearInterval(_currentInterval);
      return defer.resolve();
    }
    currentCoords.x += units.x;
    currentCoords.y += units.y;
    latLng = getLatLng(currentCoords);
    _position = {
      latitude: latLng.lat(),
      longitude: latLng.lng()
    };
    sendChangeEvent();
    moves++;
  }, 33);
  return defer.promise;
}

function sendChangeEvent() {
  SensorActionCreators.nextStep(_position, _speed);
}

var SmallStepMovement = {
  calculate: function(projection, startPosition, endPosition, heading) {
    _projection = projection;
    _heading = heading;
    _speed = 2;
    _startPosition = startPosition;
    _endPosition = endPosition;

    calculateToNewPosition()
    .then(function() {
      _speed = 1;
      return easeMovement();
    })
    .then(function(finishStatus) {
      _speed = 0;
      sendChangeEvent();
    })["catch"](function(e) {
      _speed = 0;
      sendChangeEvent();
      clearInterval(_currentInterval);
      return console.log("unknown error on accurate pos: " + e.stack, e);
    });
    return this;
  },

  cancel: function() {
    if (_promise) _promise.cancel();
    return this;
  },

  onChange: function(listener) {
    _listener = listener;
    return this;
  }
};


module.exports = SmallStepMovement;
