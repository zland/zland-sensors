var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');
var SmoothHeadingService = require('sensors/services/SmoothHeadingService');

var _heading;

var SmoothHeadingStore = assign({}, ChangeEventEmitter, {
  getHeading: function() {
    return _heading;
  }
});

SmoothHeadingStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case Constants.SENSORS_HEADING:
      SmoothHeadingService.onChange(function(heading) {
        _heading = heading;
        SmoothHeadingStore.emitChange();
      });
      SmoothHeadingService.init(action.heading);
      break;
  }
});

module.exports = SmoothHeadingStore;
