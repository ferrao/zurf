var db = require('../db');
var boom = require('boom');

/**
 * Server handler that responds to request with list of users fetched from
 * database, ordered by points
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUserList = function(request, reply) {

    var findUsers = db.model.user.find().sort('-points').find({});
    var promise = findUsers.exec();

    promise.then(function(events) {

        if (events.length < 1) {
            throw boom.notFound('No users found');
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
 * Server handler that responds to request with a user fetched from database
 * @param  {Request} request The server request
 * @param  {Reply} reply   The server reply
 */
exports.getUser = function(request, reply) {

    var findUsersById, promise;

    if (!request.params.id) {
        reply(boom.notFound());
        return;
    }

    findUsersById = db.model.user.find({
        id: request.params.id
    });

    promise = findUsersById.exec();
    promise.then(function(events) {

        if (events.length < 1) {
            throw boom.notFound('User not found');
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