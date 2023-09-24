const mongoose = require('mongoose');

// Define a schema for the data
const LucideIconSchema = new mongoose.Schema({
  contributors: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
});

// Create a Mongoose model using the schema
const LucideIcon = mongoose.model('LucideIcon', LucideIconSchema);

module.exports = LucideIcon;