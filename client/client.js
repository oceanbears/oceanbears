/* 
    --- helpers to initialize canvas and draw function 
*/

var Canvas = function() {
  var svg;
  var self = this;
  var windowHeight = $(window).height();

  //update window and svg height when the window is resized
  $(window).resize(function() {
    if($(this).height() != windowHeight) {
      windowHeight = $(this).height();
      $('.canvasView').height(windowHeight);
      svg.attr('height',windowHeight);
    }
  });
  
  //function that creates the canvas, save reference to it into svg
  var createSvg = function() {
    svg = d3.select('.canvasView').append('svg')
      .attr('width', '100%')
      .attr('height', windowHeight);
  };
  createSvg();

  //function to bind the points from the points collection
  //append a circle to all of those points that are new
  self.draw = function(data) {
    if(svg) {
      //actually does the drawing
      svg.selectAll('circle')
        .data(data, function(d) { return d._id; })
        .enter() //select the datapoints that do not have a circle element already appended
        .append('circle')
        .attr('r', 5)
        .attr('fill', function(d) { return d.color; })
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    }
  };
};
/* 
  --- end helpers
*/

//collections for the points and the users
points = new Meteor.Collection('pointsCollection');
users = new Meteor.Collection('usersCollection');

//listen to the pointsCollection in the server
Tracker.autorun( function () {
  Meteor.subscribe('pointsSubscription');
});

//Tracks the number of users currently accessing the server
Tracker.autorun( function() {
  Meteor.subscribe('usersSubscription');
  var userCt = users.find().fetch();
  Session.set('userCt', userCt.length);
});

//This variable holds the current tool that is being used
var tool;

Meteor.startup( function() {
  canvas = new Canvas();
  //The initial tool being used is the pen tool
  tool = new Meteor.tools.Pen();

  //fetch the datapoints and draw them
  Tracker.autorun(function() {
    var data = points.find({}).fetch();
    if(canvas){
      canvas.draw(data);
    }
  });
});

Template.userCount.helpers({
  //usersOn returns the number of users currently connected to the server
  usersOn: function() {
    return Session.get('userCt');
  }
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