var mongoose = require('mongoose');

var regionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  spots: [Number]
});

module.exports = mongoose.model('regions', regionSchema);