//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

//Create the Eraser tool object
//This tools can be instantiated using 'new Meteor.tools.Eraser()'
Meteor.tools.Eraser = function() {
  
    this.markPoint = function() {
    var offset = $('.canvasView').offset();
    points.insert({
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top)
    });
  };
};