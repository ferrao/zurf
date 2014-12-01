var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of users fetched from
 * database, ordered by points
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUserList = function(request, reply) {
  db.model.user.find()
    .sort('-points')
    .find({}, function(err, events) {
      if (!err) {
        reply(events);
      } else {
        reply(boom.badImplementation(err));
      }
    });
};

/**
 * Server handler that responds to request with a user fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUser = function(request, reply) {
  if (request.params.id) {
    db.model.user.find({
      id: request.params.id
    }, function(err, events) {
      if (!err) {
        if (events.length > 0) {
          reply(events[0]);
        } else {
          reply(boom.notFound(err));
        }
      } else {
        reply(boom.badImplementation(err));
      }
    });
  }
};