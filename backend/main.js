/**
 * Configuration variables
 */
var dbURI = 'mongodb://zurf:zurf@ds051980.mongolab.com:51980/zurf';
var defaultPort = 8080;
var host = 'localhost';

/**
 * Imports
 */
var db = require('./db');
var Hapi = require('hapi');
var routes = require('./routes');

/**
 * DB connection
 */
db.init(dbURI);

/**
 * Hapi Server
 */
var server = Hapi.createServer(host, process.argv[2] || defaultPort, {
  cors: true
});

routes.load(server);
server.start();