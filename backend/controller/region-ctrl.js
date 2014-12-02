var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of regions fetched from
 * database, ordered by points
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getRegions = function(request, reply) {
  db.model.region.find()
    .sort('id')
    .find({}, function(err, events) {
      if (!err) {
        reply(events);
      } else {
        reply(boom.badImplementation(err));
      }
    });
};