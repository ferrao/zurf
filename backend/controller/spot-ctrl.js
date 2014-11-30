var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of spots fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpotList = function(request, reply) {
  db.model.spot.find({}, function(err, events) {
    if (!err) {
      reply(events);
    } else {
      reply(boom.badImplementation(err));
    }
  });
};

/**
 * Server handler that responds to request with a spot fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpot = function(request, reply) {
  if (request.params.id) {
    db.model.spot.find({
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