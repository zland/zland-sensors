var SensorsActionCreators = require('sensors/actions/SensorsActionCreators');

function CordovaService(compass, geolocation, accelerometer) {
  this.watchHeadingId = null;
  this.watchPositionId = null;
  this.watchAccelerationId = null;
  this.compass = compass;
  this.geolocation = geolocation;
  this.accelerometer = accelerometer;
  // Events.subscribe('env.suspendHeading', this.clearWatchHeading, this);
  // Events.subscribe('env.resumeHeading', this.initCompass, this);
}

CordovaService.prototype = {
  clearWatchHeading = function() {
    if (this.watchHeadingId) {
      this.compass.clearWatch(this.watchHeadingId);
    }
    return this;
  },

  clearWatchPosition = function() {
    if (this.watchPositionId) {
      this.geolocation.clearWatch(this.watchPositionId);
    }
    return this;
  },

  clearWatchAcceleration = function() {
    if (this.watchPositionId) {
      this.geolocation.clearWatch(this.watchPositionId);
    }
    return this;
  },

  initCompass = function() {
    var onDeviceReady, onError, onSuccess;
    onError = function(compassError) {
      return console.log('Compass error: ' + compassError.code);
    };
    onDeviceReady = (function(_this) {
      return function() {
        var options;
        options = {
          frequency: 20
        };
        _this.watchHeadingId = this.compass.watchHeading(onSuccess, onError, options);
      };
    })(this);
    onSuccess = function(heading) {
      SensorsActionCreators.heading(heading);
    };
    document.addEventListener("deviceready", onDeviceReady, false);
    return this;
  },

  initGps = function() {
    var onDeviceReady, onError, onSuccess;
    onError = function(error) {
      return console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    };
    onDeviceReady = (function(_this) {
      return function() {
        var options;
        options = {
          maximumAge: 3000,
          timeout: 5000,
          enableHighAccuracy: true
        };
        _this.watchPositionId = this.geolocation.watchPosition(onSuccess, onError, options);
      };
    })(this);
    onSuccess = function(position) {
      SensorsActionCreators.position(position);
    };
    document.addEventListener("deviceready", onDeviceReady, false);
    return this;
  }
};


module.exports = CordovaService
