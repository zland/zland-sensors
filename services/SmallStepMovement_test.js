var rewire = require('rewire');

var SmallStepMovement = rewire('./SmallStepMovement');
SmallStepMovement.__set__('core/google/GooglePoint', function() {});
SmallStepMovement.__set__('core/google/GoogleLatLng', function() {});

describe('SmallStepMovement test', function() {
  var $body, position, projectionMock;
  position = null;
  projectionMock = {
    cnt: 0,
    fromPointToLatLng: function(coords) {
      this.cnt++;
      return {
        lng: function() {
          return coords.x * 1000 + this.cnt;
        },
        lat: function() {
          return coords.y * 1000 + this.cnt;
        }
      };
    },
    fromLatLngToPoint: function() {
      return {
        x: 100 + Math.random() * 30,
        y: 100 + Math.random() * 30
      };
    }
  };

  afterEach(function() {
    return Events.unsubscribeAll("positioning.updatePosition");
  });
  xit('wont change at inaccurate position', function() {
    var called;
    position = new SmallStepMovement;
    position.startListenForAccuratePosition();
    called = false;
    position.on('change:coords', function() {
      return called = true;
    });
    Events.fireEvent("positioning.updatePosition", [
      {
        coords: {
          accuracy: 50.5,
          lng: 200,
          lat: 200
        }
      }
    ]);
    return expect(called).toBeFalsy();
  });
  xit('change at inaccurate position', function() {
    var called;
    position = new SmallStepMovement;
    position.startListenForAccuratePosition();
    called = false;
    position.on('change:coords', function() {
      return called = true;
    });
    Events.fireEvent("positioning.updatePosition", [
      {
        coords: {
          accuracy: 10,
          lng: 200,
          lat: 200
        }
      }
    ]);
    return expect(called).toBeTruthy();
  });
  return describe("constantly moving", function() {
    it('throws without projection', function() {
      position = new SmallStepMovement;
      return expect(function() {
        return position.constantlyCalculatePosition();
      }).toThrow(new Error('projection is required'));
    });
    it('moves constantly', function() {
      var newCoords;
      position = new SmallStepMovement;
      position.set('projection', projectionMock);
      position.startListenForAccuratePosition();
      position.constantlyCalculatePosition();
      newCoords = [];
      position.on('change:coords', function(model, value) {
        return newCoords.push(value);
      });
      Events.fireEvent("positioning.updatePosition", [
        {
          coords: {
            accuracy: 10,
            lng: 20001,
            lat: 20002,
            heading: 30
          }
        }
      ]);
      waits(position.timeToMoveInSameDirection);
      return runs(function() {
        return expect(newCoords.length).toBeGreaterThan(10);
      });
    });
    return it('corrects to new location', function() {
      var newCoords;
      position = new SmallStepMovement;
      position.set('projection', projectionMock);
      position.startListenForAccuratePosition();
      position.constantlyCalculatePosition();
      newCoords = [];
      runs(function() {
        return Events.fireEvent("positioning.updatePosition", [
          {
            coords: {
              accuracy: 10,
              lng: 20001,
              lat: 20002,
              heading: 30
            }
          }
        ]);
      });
      waits(function() {
        return 200;
      });
      return runs(function() {
        return Events.fireEvent("positioning.updatePosition", [
          {
            coords: {
              accuracy: 10,
              lng: 20005,
              lat: 20006,
              heading: 30
            }
          }
        ]);
      });
    });
  });
});
