const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const fieldSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fieldSchema.plugin(toJSON);

/**
 * @typedef Field
 */
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
