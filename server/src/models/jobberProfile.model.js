const mongoose = require('mongoose');

const { toJSON } = require('./plugins');

const jobberProfileSchema = mongoose.Schema(
  {
    // Job đã hoàn thành
    jobCompleted: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    // Tổng tiền đã được trả
    totalBudget: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Các lĩnh vực có thể làm 
    field: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Field',
      },
    ],
    // Các kĩ năng bản thân có 
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
