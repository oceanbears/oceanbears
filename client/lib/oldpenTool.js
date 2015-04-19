Meteor.tools = Meteor.tools || {};

var color = 'black';
var size = 12;
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
  if (sizeValue <= 75 && sizeValue > 4) {
    size = sizeValue;
  } else {
    size = 5;
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
<<<<<<< HEAD
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
=======
    if(event.target.id === "filled"){
      //if the point has been added to the database
      console.log("db before removal: ", points.find({}))
      var x = event.target.cx.baseVal.value;
      var y = event.target.cy.baseVal.value;
      console.log(x);
      var currentId = _.pluck((points.find({ x: x, y: y}, { fields: { _id: 1 }}).fetch()), '_id')
      console.log('current id: ',currentId)
      points.remove(currentId[0])
    } else{
      points.insert({
        x: Math.floor( (event.pageX - offset.left) ),
        y: Math.floor( (event.pageY - offset.top) ),
        color: color //Added color value. Color is set through the input form. 
      });
>>>>>>> [feature] added eraser



















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


  self.clear = function() {
    d3.select('svg').remove();
    createSvg();
  };

  //function to bind the points from the points collection
  //append a circle to all of those points that are new
  self.draw = function(data) {

    if(svg) { 
      var filled = svg.selectAll('#filled').data(data);
      //actually does the drawing
      svg.selectAll('line')
        .data(data, function(d) { return d._id; })
        .enter() //select the datapoints that do not have a circle element already appended
<<<<<<< HEAD
        .append('line')
        .attr({
          x1: function(d) { return d.x1; },
          y1: function(d) { return d.y1; },
          x2: function(d) { return d.x2; },
          y2: function(d) { return d.y2; }
        })
        .style({
          'stroke-width': function(d) { return d.size; },
          stroke: function(d) { return d.color; }
        });
// =======
//         .append('circle')
//         .attr('r', 5)
//         .attr('fill', function(d) { return d.color; })
//         .attr('cx', function(d) { return d.x; })
//         .attr('cy', function(d) { return d.y; })
//         .attr('id', "filled");
// >>>>>>> [feature] added eraser
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

<<<<<<< HEAD
  Meteor.subscribe('pointsSubscription', function() {
    var initializing = true;
    var handle = points.find({}).observeChanges({
      //one item in collection added
      added: function(id) {
        if (!initializing) { 
          var eachPoint = points.find({_id:id}).fetch();
          if(canvas){
            canvas.draw(eachPoint);
          }
        }
      }
    });

    initializing = false;
    canvas.draw(points.find({}).fetch());

=======
  //fetch the datapoints and draw them
  Tracker.autorun(function() {
    if(canvas){
      canvas.draw(data);
    }
>>>>>>> [feature] added eraser
  });

});




Template.header.helpers({
  //usersOn returns the number of users currently connected to the server
  usersOn: function() {
    return Session.get('userCt');
  }

});


Template.header.events({
  'click .clearButton': function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },

  'click .dataReturn': function(event){
    Meteor.call('data', function() {
      console.log(canvas);
    })
  }
});


//These events register the user mouse inputs
Template.canvasDisplay.events({
  //add event listeners here
<<<<<<< HEAD

  'mousedown svg': function (event) {
=======
  'click': function (event) {
    tool.markPoint();
  },

  'mousedown': function (event) {
>>>>>>> [feature] added eraser
    //When draw is true, mouse move will record data points
    Session.set('draw', true);
    tool.markPoint();
  },

  'mouseup': function (event) {
    if (Session.get('draw')) {
      Session.set('draw', false);
      tool.markPoint();
    }
  },

  'mousemove': function (event) {
    //Only draws when mousemove is active
    if (Session.get('draw')) {
      tool.markPoint();
    }
  }

});