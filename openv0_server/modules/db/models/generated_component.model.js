const mongoose = require('mongoose');

// Define a schema for the data
const GeneratedComponentSchema = new mongoose.Schema({
  componentId: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model using the schema
const GeneratedComponentModel = mongoose.model('GeneratedComponent', GeneratedComponentSchema);

module.exports = GeneratedComponentModel;