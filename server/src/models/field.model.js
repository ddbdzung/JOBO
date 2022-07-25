/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const fieldSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fieldSchema.plugin(toJSON);
fieldSchema.plugin(paginate);

/**
 * @typedef Field
 */
const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
