var SmoothHeadingService = require('./SmoothHeadingService'),
    expect = require('chai').expect;

describe('heading', function() {
  it('calculates continuously', function() {
    var heading = 0;

    SmoothHeadingService.onChange(function(smoothHeading, continuousHeading) {
      console.log(arguments);
      heading = continuousHeading;
    });
    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -20
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -30
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -40
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -30
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -50
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -60
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -80
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -100
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -150
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -250
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -300
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -340
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -360
      }
    );

    expect(heading).to.equal(370);

    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -20
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -30
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -30
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -40
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -30
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -20
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );

    expect(heading).to.equal(360);

    SmoothHeadingService.init(
      {
        magneticHeading: -360
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -350
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -340
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -340
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -360
      }
    );

    expect(heading).to.equal(370);

    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -50
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -100
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -250
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -350
      }
    );
    expect(heading).to.equal(730);

    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -200
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -100
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -360
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -200
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -50
      }
    );

    expect(heading).to.equal(360);

    SmoothHeadingService.init(
      {
        magneticHeading: -360
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -100
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -50
      }
    );

    expect(heading).to.equal(-10);

    SmoothHeadingService.init(
      {
        magneticHeading: -350
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -150
      }
    );
    SmoothHeadingService.init(
      {
        magneticHeading: -320
      }
    );

    SmoothHeadingService.init(
      {
        magneticHeading: -10
      }
    );
  });
});
