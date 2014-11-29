var mongoose = require('mongoose');

exports.init = function(uri) {
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
  spot: require('./model/spot')
//  user: require('./model/user')
};