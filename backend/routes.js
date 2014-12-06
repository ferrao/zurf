var joi = require('joi');
var spotCtrl = require('./controller/spot-ctrl');
var userCtrl = require('./controller/user-ctrl');
var regionCtrl = require('./controller/region-ctrl');

/**
 * Loads API routes
 * @param  {Hapi.Server} server The hapi server
 */
exports.load = function(server) {

    console.log('Loading server routes');

    exports.root(server);
    exports.users(server);
    exports.user(server);
    exports.regions(server);
    exports.spots(server);
    exports.spotsByRegion(server);
    exports.spot(server);

};

/**
 * GET /
 * @param  {Hapi.Server} server The hapi server
 */
exports.root = function(server) {

    // Set root route
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply({
                message: "Zurf API"
            });
        }
    });

};

/**
 * GET /users
 * @param  {Hapi.Server} server The hapi server
 */
exports.users = function(server) {

    console.log('Route GET /users');

    server.route({
        method: 'GET',
        path: '/users',
        handler: userCtrl.getUserList
    });

};

/**
 * GET /users/{id}
 * @param  {Hapi.Server} server The hapi server
 */
exports.user = function(server) {

    console.log('Route GET /users/{id}');

    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: userCtrl.getUser,
        config: {
            validate: {
                params: {
                    id: joi.number().integer().min(1).max(9999)
                }
            }
        }
    });

};

/**
 * GET /regions
 * @param  {Hapi.Server} server The hapi server
 */
exports.regions = function(server) {

    console.log('Route GET /regions');

    server.route({
        method: 'GET',
        path: '/regions',
        handler: regionCtrl.getRegions
    });

};


/**
 * GET /spots
 * @param  {Hapi.Server} server The hapi server
 */
exports.spots = function(server) {

    console.log('Route GET /spots');

    server.route({
        method: 'GET',
        path: '/spots',
        handler: spotCtrl.getSpotList
    });

};

/**
 * GET /spots/{id}
 * @param  {Hapi.Server} server The hapi server
 */
exports.spot = function(server) {

    console.log('Route GET /spots/{id}');

    server.route({
        method: 'GET',
        path: '/spots/{id}',
        handler: spotCtrl.getSpot,
        config: {
            validate: {
                params: {
                    id: joi.number().integer().min(1).max(9999)
                }
            }
        }
    });

};

/**
 * GET /spots/region/{id}
 * @param  {Hapi.Server} server The hapi server
 */
exports.spotsByRegion = function(server) {

    console.log('Route GET /spots/region/{id}');

    server.route({
        method: 'GET',
        path: '/spots/region/{id}',
        handler: spotCtrl.getSpotsByRegion,
        config: {
            validate: {
                params: {
                    id: joi.number().integer().min(1).max(9999)
                }
            }
        }
    });

};