var mongoose = require('mongoose');


/**
 * [init description]
 * @param  {String} uri   The database connection URI
 * @param  {Boolean} debug Debug mode
 */
exports.init = function(uri, debug) {

  //Configure debug settings
  mongoose.set('debug', debug === true ? true : false);

  console.log('Connecting to database...');
  mongoose.connect(uri);

  // Connection successful
  mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + uri);
  });

  // Connection error
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // Disconnection
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected due to app termination');
      process.exit(0);
    });
  });

};

// Loading Schemas
exports.model = {
  user: require('./model/user'),
  spot: require('./model/spot')
};