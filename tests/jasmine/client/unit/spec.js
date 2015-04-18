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

describe('Brush size', function() {
  it('should have brush slider', function() {
    expect($('#slider')).toBeDefined();
  });

  it('should have default size of 12px', function() {
    //in array 7 is 12px
    expect($('#slider').slider("value")).toBe(7);
  });

  it('should be able to change size from 12px to 75px', function() {
    //changing size to 75px (30th in array)
    $('#slider').slider("value", 30);
    //checking size
    expect($('#slider').slider("value")).toBe(30);
  });

});
