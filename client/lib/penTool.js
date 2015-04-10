//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

//Create the Pen tool object
//This tool can be instantiated using 'new Meteor.tools.Pen()'
Meteor.tools.Pen = function() {
  //The markPoint function is called whenever the mouse moved. This is the function
  //that will be used to create the different behaviors of the different tools.
  this.markPoint = function() {
    var offset = $('.canvasView').offset();
    points.insert({
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top)
    });
  };
};

console.log(new Meteor.tools.Pen());