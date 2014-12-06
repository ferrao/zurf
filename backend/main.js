/**
 * Configuration variables
 */
var dbURI = 'mongodb://zurf:zurf@ds051980.mongolab.com:51980/zurf';
var defaultPort = 8090;
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
db.init(dbURI, true);

/**
 * Hapi Server
 */
var server = Hapi.createServer(host, process.argv[2] || defaultPort, {
    cors: true
});

routes.load(server);

//server.log(['server'],'Starting server...');
console.log('Starting server...');
server.start();