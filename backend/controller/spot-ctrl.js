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

        if (events < 1) {
            throw boom.notFound("No spots found");
        }

        reply(events);

    }).then(null, function(err) {

        if (err.isBoom) {
            reply(err);
        } else {
            reply(boom.badImplementation(err));
        }

    });
};

/**
 * Server handler that responds to request with list of spots fetched from database,
 * for a specific region
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getSpotsByRegion = function(request, reply) {

    var getRegionSpots, promise, ids, findSpotsByIds;

    if (!request.params.id) {
        reply(boom.notFound());
        return;
    }

    getRegionSpots = db.model.region.find({
        id: request.params.id
    }).select('spots');

    promise = getRegionSpots.exec();
    promise.then(function(events) {

        if (events.length < 1) {
            throw boom.notFound('Region not found');
        }

        ids = events[0].spots;
        findSpotsByIds = db.model.spot.find({
            id: {
                $in: ids
            }
        });

        return findSpotsByIds.exec();

    }).then(function(events) {

        if (events.length < 1) {
            throw boom.notFound('No spots found');
        }

        reply(events);

    }).then(null, function(err) {

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

    var findSpotsById, promise;

    if (!request.params.id) {
        reply(boom.notFound());
        return;
    }

    findSpotsById = db.model.spot.find({
        id: request.params.id
    });

    promise = findSpotsById.exec();
    promise.then(function(events) {

        if (events.length < 1) {
            throw boom.notFound("Spot not found");
        }

        reply(events[0]);

    }).then(null, function(err) {

        if (err.isBoom) {
            reply(err);
        } else {
            reply(boom.badImplementation(err));
        }

    });
};