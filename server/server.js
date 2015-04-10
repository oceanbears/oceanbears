// adds points database
var points = new Meteor.Collection('pointsCollection');

Meteor.publish('pointsSubscription', function() {
  return points.find();
})


