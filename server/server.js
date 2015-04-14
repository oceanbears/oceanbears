// adds points database
var points = new Meteor.Collection('pointsCollection');
var users = new Meteor.Collection('usersCollection');

//reomve all users from the collection when the server initializes
users.remove({});

//make collections available to clients
Meteor.publish('pointsSubscription', function() {
  return points.find();
});
Meteor.publish('usersSubscription', function() {
  return users.find();
});

//Add user to the users collection when their socket opens (http://docs.meteor.com/#/full/meteor_onconnection)
Meteor.onConnection(function(conn) {
  users.insert({ user: conn.id });
  var conn = conn;
  conn.onClose(function() {
    //remove that user from the collection when it disconnects
    users.remove({ user: conn.id });
  });
});