const mongoose = require('mongoose');

const { toJSON } = require('./plugins');

const jobberProfileSchema = mongoose.Schema(
  {
    jobCompleted: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    totalBudget: {
      type: Number,
      required: true,
      min: 0,
    },
    field: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Field',
      },
    ],
    skill: [
      { type: String },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobberProfileSchema.plugin(toJSON);

/**
 * @typedef JobberProfile
 */
const JobberProfile = mongoose.model('JobberProfile', jobberProfileSchema);

module.exports = JobberProfile;
