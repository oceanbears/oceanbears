describe('Tests', function() {
  it('should have a working test', function() {
    expect(true).toBe(true);
  });
});

describe('penTool', function() {
  var pen;

  beforeEach(function() {
    pen = new Meteor.tools.Pen();
  });

  it('should have a pen class instantiator', function() {
    expect(Meteor.tools.Pen).toBeDefined();
    expect(pen).toBeDefined();
  });

  it('should have a markPoint function', function() {
    expect(pen.markPoint).not.toBeUndefined();
  });
});

describe('client', function() {
  it('should have an svg element', function() {
    console.log($('svg'));
    expect($('svg').length).toBe(1);
  });

  it('should have a size and a color input form', function() {
    
  })
});