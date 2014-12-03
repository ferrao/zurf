var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of regions fetched from
 * database, ordered by points
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getRegions = function(request, reply) {
  var findRegions = db.model.region.find()
    .sort('id')
    .find({});
  var promise = findRegions.exec();

  promise.then(function(events) {

      if (events.length < 1) {
        throw boom.notFound('No regions found');
      }

      reply(events);

    })
    .then(null, function(err) {
      if (err.isBoom) {
        reply(err);
      } else {
        reply(boom.badImplementation(err));
      }
    });
};