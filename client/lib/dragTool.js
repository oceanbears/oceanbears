//This creates the tools object if it does not already exist;
Meteor.tools = Meteor.tools || {};

//The drag tool measures the offset from the start of dragging to the current mouse position
var currX = 0;
var currY = 0;
var startX;
var startY;

Meteor.tools.drag = {
  //instantiates a drag tool class
  markPoint: function() {
    if (startX === undefined && startY === undefined) {
      //set the start coordinates 
      startX = event.pageX;
      startY = event.pageY;
    }
    if (Session.get('draw') === false) {
      //on mouseup, set the offset to be the difference between the current mouse
      //position and the starting mouse position
      Session.set('offsetX', Session.get('offsetX') + startX - event.pageX);
      Session.set('offsetY', Session.get('offsetY') + startY - event.pageY);
      console.log('xy offsets: ', Session.get('offsetX'), Session.get('offsetY'));
      startX = undefined;
      startY = undefined;
    }
  }
}