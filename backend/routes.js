var spotCtrl = require('./controller/spot-ctrl');
var userCtrl = require('./controller/user-ctrl');

/**
 * Loads API routes
 * @param  {Hapi.Server} server The hapi server
 */
exports.load = function(server) {
  console.log('Loading server routes');
  exports.root(server);
  exports.users(server);
  exports.user(server);
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
    handler: userCtrl.getUser
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
    handler: spotCtrl.getSpot
  });
};