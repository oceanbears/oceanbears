
/* 
    --- helpers to initialize canvas and draw function 
*/
var Canvas = function() {
  var svg;
  var self = this;
  var windowHeight = $(window).height();

  //update window and svg height when the window is resized
  $(window).resize(function() {
    if($(this).height() !== windowHeight) {
      windowHeight = $(this).height();
      $('.canvasView').height(windowHeight);
      svg.attr('height', windowHeight);
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
      svg.selectAll('line')
        .data(data, function(d) { return d._id; })
        .attr({
          x1: function(d) { return d.x1 - Session.get('offsetX'); },
          y1: function(d) { return d.y1 - Session.get('offsetY'); },
          x2: function(d) { return d.x2 - Session.get('offsetX'); },
          y2: function(d) { return d.y2 - Session.get('offsetY'); }
        });

      svg.selectAll('line')
        .data(data, function(d) { return d._id; })
        .enter() //select the datapoints that do not have a circle element already appended
        .append('line')
        .attr({
          x1: function(d) { return d.x1 - Session.get('offsetX'); },
          y1: function(d) { return d.y1 - Session.get('offsetY'); },
          x2: function(d) { return d.x2 - Session.get('offsetX'); },
          y2: function(d) { return d.y2 - Session.get('offsetY'); }
        })
        .style({
          'stroke-linecap': 'round',
          'stroke-width': function(d) { return d.size; },
          stroke: function(d) { return d.color; }
        });

      svg.selectAll('line')
        .data(data, function(d) { return d._id})
        .exit()
        .remove()
    }
  };
};
/* 
  --- end helpers
*/


//collections for the points and the users
points = new Meteor.Collection('pointsCollection');
users = new Meteor.Collection('usersCollection');


//Tracks the number of users currently accessing the server
Tracker.autorun(function() {
  Meteor.subscribe('usersSubscription');
  var userCt = users.find().fetch();
  Session.set('userCt', userCt.length);
});

//This variable holds the current tool that is being used
var tool;

Meteor.startup(function() {
  canvas = new Canvas();
  //The initial tool being used is the pen tool
  tool = Meteor.tools.pen;
  //offsetX and offsetY are the user's current viewing point
  Session.set('offsetX', 0);
  Session.set('offsetY', 0);

  Meteor.subscribe('pointsSubscription', function() {
    var initializing = true;
    var handle = points.find({}).observeChanges({
      //one item in collection added
      added: function(id) {
        if (!initializing) { 
          if (canvas) {
            canvas.draw(points.find({}).fetch());
          }
        }
      },

      removed: function(id) {
        if (canvas) {
          canvas.draw(points.find({}).fetch());
        }
      }
    });

    initializing = false;
    canvas.draw(points.find({}).fetch());
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
  'click .eraser': function(event) {
    if( $('.eraser').prop('checked') ){
      $('html, body').css('cursor', 'url(http://png-4.findicons.com/files/icons/1156/fugue/16/eraser.png) 5 13, auto');
      if ($('.drag').prop('checked')) {
        $('.drag').prop('checked', false);
        tool = Meteor.tools.pen; 
      }
    } else {
      $('html, body').css('cursor', 'url(http://www.downloadclipart.net/svg/14969-paint-brush-svg.svg) 10 42, auto');
    }
  },

  'click .drag': function(event) {
    //toggle the tool between the drag tool and the pen tool when the checkbox is clicked
    if ($('.drag').prop('checked') === true) {
      $('html, body').css('cursor', 'move');
      $('.eraser').prop('checked', false);
      tool = Meteor.tools.drag;
    } else {
      $('html, body').css('cursor', 'url(http://www.downloadclipart.net/svg/14969-paint-brush-svg.svg) 10 42, auto');
      tool = Meteor.tools.pen;
    }
  },

  'mousedown svg': function(event) {
    //When draw is true, mouse move will record data points
    Session.set('draw', true);
    tool.markPoint();
  },

  'mouseup': function(event) {
    if (Session.get('draw')) {
      Session.set('draw', false);
      tool.markPoint();
      canvas.draw(points.find({}).fetch());
    }
  },

  'mousemove': function(event) {
    //Only draws when mousemove is active
    if (Session.get('draw')) {
      tool.markPoint();
    }
  }

});
