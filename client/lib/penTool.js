//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

var color;
var radius = 10;
var startPt;

//This function is called when a new color is submitted and resets the form.
Meteor.tools.getColor = function() {
  color = document.getElementById("input").value;
  document.getElementById("input").value = '';
  return false;
};

//This function is called when a new radius dimension is submitted. 
Meteor.tools.getRadius = function() {
  var radiusValue = parseInt(document.getElementById("radius").value);
  if (radiusValue < 31 && radiusValue > 4) {
    radius = radiusValue;
  } else {
    radius = 10;
  }
  return false;
};

//Create the Pen tool object
//This tool can be instantiated using 'new Meteor.tools.Pen()'
Meteor.tools.Pen = function() {
  //The markPoint function is called whenever the mouse moved. This is the function
  //that will be used to create the different behaviors of the different tools.
  this.markPoint = function() {
    var offset = $('.canvasView').offset();
    points.insert({
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top),
      color: color, //Added color value. Color is set through the input form. 
      radius: radius //Added radius value. Radius is set through the input form.
    });
  };
};
