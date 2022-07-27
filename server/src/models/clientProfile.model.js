const mongoose = require('mongoose');

const { toJSON } = require('./plugins');

const clientProfileSchema = mongoose.Schema(
  {
    // JOB đang tuyển
    openProject: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    // JOB đang hoạt động chưa kết thúc (không tuyển nữa)
    activeProject: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Job',
      },
    ],
    // JOB đã hoàn thành (bao gồm thành công hoặc thất bại)
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
