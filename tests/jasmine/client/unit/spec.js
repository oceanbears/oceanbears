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

describe('client display', function() {
  it('should have an svg element', function() {
    expect($('svg').length).toBe(1);
  });

  it('should have a size and a color input form', function() {
    expect($('.sizeInput').length).toBe(1);
    expect($('.input').length).toBe(1);
  });
});

describe('user count', function() {
  MeteorStubs.install();

  it('should have a user counter', function(done) {
    $(function() {
      expect($('.usersOnline').length).toBe(1);
      expect($('.usersOnline')[0]).toBeDefined();
      expect(parseInt($('.usersOnline').text().match(/\d/)[0])).toBeDefined();
      done();
    });
  });

  xit('should increment and decrement user counter', function() {
    //needs test
  });
});