var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    points: Number,
    image: String
});

module.exports = mongoose.model('users', userSchema);