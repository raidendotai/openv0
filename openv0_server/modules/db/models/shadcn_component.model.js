const mongoose = require('mongoose');

// Define a schema for the Accordion data
const shadcnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  docs_path: {
    type: String,
    required: true,
  },
  docs: {
    import: {
      source: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
    use: [
      {
        source: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],
    examples: [
      {
        source: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

// Create a Mongoose model using the schema
const ShadcnModel = mongoose.model('ShadcnCompoent', shadcnSchema);

module.exports = ShadcnModel;
