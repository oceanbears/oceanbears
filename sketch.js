if (Meteor.isClient) {
  var cv; //canvas context variable
  var mouseActive = false;

  Template.canvasDisplay.helpers({
    //add helpers here
  });

  var getMouse = function(e) {
    //get the current mouse position from the event data
    var x = e.clientX;
    var y = e.clientY;

    return [x, y];
  }

  Template.canvasDisplay.events({
    //add event listeners here
    'mousedown': function(e) {
      //register mousedown
      var coor = getMouse(e);
      //start making a path starting from the current mouse position
      mouseActive = true;
      cv.lineWidth = '2';
      cv.moveTo(coor[0], coor[1]);
    },
    'mousemove': function(e) {
      //on mousemove, fill in the path, then move the start position to current mouse position
      if (mouseActive) {  
        var coor = getMouse(e);
        cv.lineTo(coor[0], coor[1]);
        cv.stroke();
        cv.moveTo(coor[0], coor[1]);
      }
    },
    'mouseup': function(e) {
      //on mouseup, close the last path
      var coor = getMouse(e);
      cv.lineTo(coor[0], coor[1]);
      cv.stroke();
      mouseActive = false;
    },
  });

  Template.canvasDisplay.onRendered(function() {
    cv = $('.canvas')[0].getContext('2d');

  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}