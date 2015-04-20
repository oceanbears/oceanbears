//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

var color = 'black';
var size = 12;
//StartX and StartY are the from coordinates; when drawing, a line is created from the start coordinates to the current mouse position
var startX;
var startY;
//This function is called when a new color is submitted and resets the form.
Meteor.tools.getColor = function() {
  color = document.getElementById('color').value;
  return false;
};

//This function is called when a new size dimension is submitted. 
Meteor.tools.getSize = function() {
  var sizeValue = parseInt(document.getElementById('size').value);
  if (sizeValue <= 75 && sizeValue > 4) {
    size = sizeValue;
  } else {
    size = 5;
  }
  return false;
};

//Create the pen tool object
//This tool can be instantiated using 'new Meteor.tools.Pen()'
Meteor.tools.pen = {
  //The markPoint function is called whenever the mouse moved. This is the function
  //that will be used to create the different behaviors of the different tools.
  markPoint: function() {
    //Insert a line from the start coordinates to the current mouse position. 
    var offset = $('.canvasView').offset();
    var currX = Session.get('offsetX') + event.pageX - offset.left;
    var currY = Session.get('offsetY') + event.pageY - offset.top;
    if ($('.eraser').prop('checked')){
      console.log('erase!', event);
      if (event.target.x1) {
        var x1 = event.target.x1.baseVal.value + Session.get('offsetX');
        var y1 = event.target.y1.baseVal.value + Session.get('offsetY');
        var x2 = event.target.x2.baseVal.value + Session.get('offsetX');
        var y2 = event.target.y2.baseVal.value + Session.get('offsetY');
        var currentId = _.pluck((points.find({ x1: x1, y1: y1, x2: x2, y2: y2}, { fields: { _id: 1 }}).fetch()), '_id');
        if(currentId[0]){
          points.remove(currentId[0]);
        }
      }
    } else if (startX === undefined && startY === undefined) {
      startX = currX;
      startY = currY;
    } else {
      points.insert({
        x1: startX,
        y1: startY,
        x2: currX,
        y2: currY,
        color: color, //Added color value. Color is set through the input form. 
        size: size //Added size value. Radius is set through the input form.
      });
      //Prepare startX and startY for the next line or reset it if user is done drawing
      if (Session.get('draw')) {
        startX = currX;
        startY = currY;
      } else {
        startX = undefined;
        startY = undefined;
      }
    }
  }
};
