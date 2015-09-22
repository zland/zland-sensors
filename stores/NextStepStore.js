'use strict';

var ChangeEventEmitter = require('core/ChangeEventEmitter');
var assign = require('object-assign');
var Dispatcher = require('core/Dispatcher');
var Constants = require('sensors/Constants');

var _nextStep, _speed;

var NextStepStore = assign({}, ChangeEventEmitter, {
  getNextStep: function() {
    return _nextStep;
  },
  getSpeed: function() {
    return _speed;
  }
});

NextStepStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case Constants.NEXT_STEP:
      _nextStep = action.position;
      _speed = action.speed;
      NextStepStore.emitChange();
      break;
  }
});

module.exports = NextStepStore;
