if (Meteor.isClient) {

  Canvases = new Mongo.Collection("canvases");

  Template.canvasDisplay.helpers({
    //add helpers here
  });


  Template.canvasDisplay.events({
    //add event listeners here
    
  });

  Template.canvasDisplay.onRendered(function() {
    // initialize the literally canvas widget

    var lc = LC.init(
      document.getElementsByClassName('canvasView')[0],
      {imageURLPrefix: '/client/img'}
    );

    //save to database on change
    lc.on('drawingChange', function(){
      console.log("snapshot: ", lc.getSnapshotJSON() )
      Canvases.insert( lc.getSnapshotJSON() );
      console.log("data inserted");
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup

  });
}