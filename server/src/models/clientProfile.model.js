const mongoose = require('mongoose');

const { toJSON } = require('./plugins');

const clientProfileSchema = mongoose.Schema(
  {
    openProject: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    activeProject: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    pastProject: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
clientProfileSchema.plugin(toJSON);

/**
 * @typedef ClientProfile
 */
const ClientProfile = mongoose.model('ClientProfile', clientProfileSchema);

module.exports = ClientProfile;
