//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

var color = 'black';
var size = 10;
//StartX and StartY are the from coordinates; when drawing, a line is created from the start coordinates to the current mouse position
var startX;
var startY;

//This function is called when a new color is submitted and resets the form.
Meteor.tools.getColor = function() {
  color = document.getElementById("input").value;
  document.getElementById("input").value = '';
  return false;
};

//This function is called when a new size dimension is submitted. 
Meteor.tools.getSize = function() {
  var sizeValue = parseInt(document.getElementById("size").value);
  if (sizeValue < 31 && sizeValue > 4) {
    size = sizeValue;
  } else {
    size = 10;
  }
  return false;
};

//Create the Pen tool object
//This tool can be instantiated using 'new Meteor.tools.Pen()'
Meteor.tools.Pen = function() {
  //The markPoint function is called whenever the mouse moved. This is the function
  //that will be used to create the different behaviors of the different tools.
  this.markPoint = function() {
    //Insert a line from the start coordinates to the current mouse position. 
    var offset = $('.canvasView').offset();
    var currX = event.pageX - offset.left;
    var currY = event.pageY - offset.top;
    if (startX === undefined && startY === undefined) {
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
  };
};
