var mongoose = require('mongoose');

var spotSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  direction: String,
  mswid: Number,
  image: String,
  votes: [{
    timestamp: { type: Date, default: Date.now },
    surfer: String,
    size: { type: Number, min: 1, max: 5 },
    quality: { type: Number, min: 1, max: 5 },
  }],
  votes_count: Number,
  quality: { type: Number, min: 1, max: 5 },
  size: { type: Number, min: 1, max: 5 },
});

module.exports = mongoose.model('Spot', spotSchema);