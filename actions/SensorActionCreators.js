var Dispatcher = require('core/Dispatcher');
var Constants = require('../Constants');

var DELAY_BETWEEN_POSITION_CHANGE = 3000;
var ACCURACY_ACCEPTANCE_LEVEL = 35;

module.exports = {

  position: function(position) {
    Dispatcher.dispatch({
      type: Constants.SENSORS_POSITION,
      position: position
    });
  },

  heading: function(heading) {
    Dispatcher.dispatch({
      type: Constants.SENSORS_HEADING,
      heading: heading
    });
  },

  nextStep: function(position, speed) {
    Dispatcher.dispatch({
      type: Constants.SENSORS_NEXT_STEP,
      position: position,
      speed: speed
    });
  },

  nextHeading: function(heading) {
    Dispatcher.dispatch({
      type: Constants.SENSORS_NEXT_HEADING,
      heading: heading
    });
  }
};
