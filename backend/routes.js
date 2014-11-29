var db = require('./db');
var boom = require('boom');

/**
 * Loads API routes
 * @param  {Hapi.Server} server The hapi server
 */
exports.load = function(server) {
  console.log('Loading routes');
  exports.root(server);
  exports.users(server);
  exports.spots(server);
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
  console.log('Loading route GET /users');
};

/**
 * GET /spots
 * @param  {Hapi.Server} server The hapi server
 */
exports.spots = function(server) {
  console.log('Loading route GET /spots');
  server.route({
    method: 'GET',
    path: '/spots',
    handler: function(request, reply) {
      db.model.spot.find({}, function(err, events) {
        if (!err) {
          reply(events);
        } else {
          reply(boom.badImplementation(err));
        }
      });
    }
  });
};

/**
 * GET /breaks/{id}
 * @param  {Hapi.Server} server The hapi server
 * @return {[type]}        [description]
 */
exports.spot = function(server) {
  console.log('Loading route GET /spots/{id}');
  server.route({
    method: 'GET',
    path: '/spots/{id}',
    handler: function(request, reply) {
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
    }
  });
};