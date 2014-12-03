var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of users fetched from
 * database, ordered by points
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUserList = function(request, reply) {
  var findUsers = db.model.user.find()
    .sort('-points')
    .find({});
  var promise = findUsers.exec();

  promise.then(function(events) {
    reply(events);
  }, function(err) {
    reply(boom.badImplementation(err));
  });
};

/**
 * Server handler that responds to request with a user fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUser = function(request, reply) {

  if (!request.params.id) {
    reply(boom.notFound());
    return;
  }

  var findUsersById = db.model.user.find({
    id: request.params.id
  });
  var promise = findUsersById.exec();

  promise.then(function(events) {
    if (events.length > 0) {
      reply(events[0]);
    } else {
      reply(boom.notFound());
    }
  }, function(err) {
    reply(boom.badImplementation(err));
  });
};