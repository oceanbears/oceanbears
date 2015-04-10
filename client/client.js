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
var markPoint = function() {
  var offset = $('.canvasView').offset();
      points.insert({
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top)});
}


points = new Meteor.Collection('pointsCollection');

Deps.autorun( function () {
  Meteor.subscribe('pointsSubscription');
});

Meteor.startup( function() {
  canvas = new Canvas();


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


Template.canvasDisplay.events({
  //add event listeners here

  'click': function (event) {
    markPoint();
  },

  'mousedown': function (event) {
    Session.set('draw', true);
  },

  'mouseup': function (event) {
    Session.set('draw', false);
  },

  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }

});