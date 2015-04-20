describe('penTool', function() {
  var pen;

  beforeEach(function() {
    pen = Meteor.tools.pen;
  });

  it('should have a pen class instantiator', function() {
    expect(Meteor.tools.pen).toBeDefined();
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

describe('Color selection', function() {
  it('should have color picker', function() {
    expect($('#color')).toBeDefined();
    expect($('#color').attr("type")).toBe("color");
  });

  it('should have black color as default color', function() {
    //default color should be black (#000000);
    expect($('#color').val()).toBe('#000000');
  });

  it('should should be able to change color', function() {
    //set color to white
    $('#color').val("#ffffff");
    //get color
    Meteor.tools.getColor();
    //check if color is white
    expect($('#color').val()).toBe('#ffffff');
  });

});

describe('Eraser Function', function() {
  it('should exist', function() {
    expect($('.eraser')).toBeDefined();
  });

  it('should be off on page load', function() {
    expect($('.eraser').prop('checked')).toBe(false);
  });

  it('should be true when checked', function() {
    $('.eraser').prop('checked', true);
    expect($('.eraser').prop('checked')).toBe(true);
  });

  it('should delete a point from the database', function() {
    points.insert({
        _id: '1',
          x: 100,
          y: 100
        });
    points.remove('1');
    expect(points.find({x: 100, y: 100}).fetch().length).toBe(0);
  });

});







