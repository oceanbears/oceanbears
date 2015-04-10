/* 
    --- helpers to initialize canvas and draw function 
*/

var Canvas = function() {
  var self = this;


  //creates the canvas
  var createSvg = function() {
    svg = d3.select('.canvasView').append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
  };
  createSvg();

  self.draw = function(data) {
    if(svg) {
      //actually does the drawing
      svg.selectAll('circle')
        .data(data, function(d) { return d._id; })
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    }
  }
};
/* 
  --- end helpers
*/


// mouse tracker
// var markPoint = function() {
//   var offset = $('.canvasView').offset();
//   points.insert({
//     x: (event.pageX - offset.left),
//     y: (event.pageY - offset.top)
//   });
// }

points = new Meteor.Collection('pointsCollection');

Deps.autorun( function () {
  Meteor.subscribe('pointsSubscription');
});

//This variable holds the current tool that is being used
var tool;

Meteor.startup( function() {
  canvas = new Canvas();
  //The initial tool being used is the pen tool
  tool = new Meteor.tools.Pen();

  Deps.autorun( function() {
    var data = points.find({}).fetch();
    if(canvas){
      canvas.draw(data);
    }
  });
})

Template.canvasDisplay.helpers({
  //add helpers here

});

//These events register the user mouse inputs
Template.canvasDisplay.events({
  //add event listeners here

  'click': function (event) {
    tool.markPoint();
  },

  'mousedown': function (event) {
    //When draw is true, mouse move will record data points
    Session.set('draw', true);
  },

  'mouseup': function (event) {
    Session.set('draw', false);
  },

  'mousemove': function (event) {
    //Only draws when mousemove is active
    if (Session.get('draw')) {
      tool.markPoint();
    }
  }

});