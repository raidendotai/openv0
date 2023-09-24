const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  context: {
    type: Array,
    required: true,
  }, // Embed the context schema as an array
  completion: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  req: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  type: {
    type: String,
    required: true,
  }
});

const LogModel = mongoose.model('Log', logSchema);

module.exports = LogModel;