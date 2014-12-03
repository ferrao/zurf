var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of spots fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpotList = function(request, reply) {
  var findSpots = db.model.spot.find({});
  var promise = findSpots.exec();

  promise.then(function(events) {
    reply(events);
  }, function(err) {
    reply(boom.badImplementation(err));
  });
};

/**
 * Server handler that responds to request with list of spots fetched from database,
 * for a specific region
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpotsByRegion = function(request, reply) {

  if (!request.params.id) {
    reply(boom.notFound());
    return;
  }

  var getRegionSpots = db.model.region.find({
      id: request.params.id
    })
    .select('spots');
  var promise = getRegionSpots.exec();

  promise.then(function(events) {

      if (events.length < 1) {
        throw boom.notFound('Region not found');
      }

      var ids = events[0].spots;
      var findSpotsByIds = db.model.spot.find({
        id: {
          $in: ids
        }
      });

      return findSpotsByIds.exec();
    })
    .then(function(events) {
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

/**
 * Server handler that responds to request with a spot fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpot = function(request, reply) {

  if (!request.params.id) {
    reply(boom.notFound());
    return;
  }

  var findSpotsById = db.model.spot.find({
    id: request.params.id
  });
  var promise = findSpotsById.exec();

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