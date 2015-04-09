if (Meteor.isClient) {
  var cv; //canvas variable

  Template.canvasDisplay.helpers({
    //add helpers here
  });

  Template.canvasDisplay.events({
    //add event listeners here
  });

  Template.canvasDisplay.onRendered(function() {
    cv = $('.canvas').sketch();
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}