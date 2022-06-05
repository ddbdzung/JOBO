const mongoose = require('mongoose');

const { toJSON } = require('./plugins')

const jobberProfileSchema = mongoose.Schema(
  {
    jobCompleted: [
      {
        jobId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Job',
        }
      }
    ],
    totalBudget: { 
      type: Number, 
      required: true, 
      min: 0,
    },
    reviewId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Review',
    },
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
jobberProfileSchema.plugin(toJSON);

/**
 * @typedef JobberProfile
 */
const JobberProfile = mongoose.model('JobberProfile', jobberProfileSchema);

module.exports = JobberProfile;
