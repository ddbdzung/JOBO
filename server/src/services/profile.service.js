/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const _ = require('lodash');

const { ClientProfile, JobberProfile, User } = require('../models');
const { userService, jobService } = require('./index');
const ApiError = require('../utils/ApiError');
const { Job } = require('../models');

/**
 * Get client profile by its id
 * @param {String} profileId id
 * @returns {Promise<ClientProfile>}
 */
const getClientProfileById = async (profileId) => {
  return ClientProfile.findById(profileId);
};

/**
 * Create client profile by user id
 * @param {Object} profileBody
 * @returns {Promise<ClientProfile>}
 */
const createClientProfile = async (profileBody) => {
  return ClientProfile.create(profileBody);
};

/**
 * Get hireling profile by its id
 * @param {String} profileId id
 * @returns {Promise<JobberProfile>}
 */
const getJobberProfileById = async (profileId) => {
  return JobberProfile.findById(profileId);
};

/**
 * Create client profile by user id
 * @param {Object} profileBody
 * @returns {Promise<JobberProfile>}
 */
const createJobberProfile = async (profileBody) => {
  return JobberProfile.create(profileBody);
};

/**
 * Delete client and jobber profile of a user
 * @param {String} userId
 * @returns {Promise<{ClientProfile, JobberProfile}>}
 */
const deleteProfileByUserId = async (userId) => {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { clientProfileId, jobberProfileId } = user;
  Promise.all([getClientProfileById(clientProfileId), getJobberProfileById(jobberProfileId)])
    .then(([clientProfile, jobberProfile]) => {
      clientProfile.remove();
      jobberProfile.remove();
      return {
        clientProfile,
        jobberProfile,
      };
    })
    .catch((err) => {
      throw new ApiError(httpStatus.NOT_FOUND, err.message);
    });
};

const getClientProfileByUserId = async (userId) => {
  const user = await User.findById(userId).populate('clientProfileId');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const profile = user?.clientProfileId;
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No client profile found');
  }

  return profile;
};

const getJobberProfileByUserId = async (userId) => {
  const user = await User.findById(userId).populate('jobberProfileId');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const profile = user?.jobberProfileId;
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No hireling profile found');
  }

  return profile;
};

/**
 * Add a jobId to one of three properties in client model and modify jobber model
 * @param {String} userId
 * @param {String} jobId
 * @param {String} option ['open', 'active', 'past']
 * @returns {Promise<ClientProfile>}
 */
const addJobIdToOptionProject = async (userId, jobId, option) => {
  option += 'Project';
  const rule = ['openProject', 'activeProject', 'pastProject'];
  if (!rule.includes(option)) {
    throw new ApiError(httpStatus.FORBIDDEN, `Invalid option '${option}'`);
  }

  // Nếu job ở trạng thái done
  // Tiến hành cập nhật lại jobberProfile cho tất cả jobber
  // Thỏa mãn điều kiện:
  // jobber ở jobberNegotiation.jobberUser
  // jobber ở trạng thái joined
  const job = await Job.findById(jobId);

  job.jobberNegotiation.forEach(async (item) => {
    const jobberProfile = await getJobberProfileByUserId(item.jobberUser);
    if (option === 'openProject' || option === 'activeProject') {
      // Kiểm tra xem đã có jobId trong jobCompleted chưa
      // Nếu có rồi => Xóa khỏi jobCompleted
      // Do project tiếp tục => job chưa hoàn thành
      // if (jobberProfile.jobCompleted.includes(jobId)) {
      _.remove(jobberProfile.jobCompleted, (id) => id.toString() === jobId.toString());
      // }
    } else if (option === 'pastProject' && item.status === 'joined') {
      // Add jobId vào jobCompleted
      jobberProfile.jobCompleted.push(jobId);
    }
    await JobberProfile.updateOne({ _id: jobberProfile.id }, jobberProfile);
  });

  // Check if profile[option] has jobId => Can not push jobId anymore
  // Just return profile immediately
  const profile = await getClientProfileByUserId(userId);
  if (profile[option].includes(jobId)) {
    return profile;
  }

  // Remove jobId if existing in other property
  const [restOpt1, restOpt2] = rule.filter((opt) => opt !== option);
  _.remove(profile[restOpt1], (id) => id.toString() === jobId.toString());
  _.remove(profile[restOpt2], (id) => id.toString() === jobId.toString());

  // Add jobId to profile[option]
  profile[option].push(jobId);
  // Update profile
  await ClientProfile.updateOne({ _id: profile.id }, profile);

  return profile;
};

/**
 *
 * @param {String<Array>} jobIds
 * @returns totalBudget
 */
const getTotalBudgetByJobId = async (jobIds) => {
  let budget = 0;
  jobIds.foreach(async (jobId) => {
    const job = await jobService.getJobById(jobId);
    budget += parseFloat(job.budget);
  });
  return budget;
};

/**
 *
 * @param {String} userId
 * @param {String} jobId Only 1 jobId can be updated each time.
 * @returns updated jobber Profile
 */
const updateJobberProfileByUserId = async (userId, jobId, fieldId, skill) => {
  const jobberProfile = await getJobberProfileByUserId(userId);
  jobberProfile.jobCompleted = jobId;
  jobberProfile.field = fieldId;
  jobberProfile.skill = skill;
  jobberProfile.totalBudget = getTotalBudgetByJobId();
  return jobberProfile;
};

module.exports = {
  getClientProfileById,
  createClientProfile,
  getJobberProfileById,
  createJobberProfile,
  deleteProfileByUserId,
  addJobIdToOptionProject,
  getClientProfileByUserId,
  getJobberProfileByUserId,
  updateJobberProfileByUserId,
  getTotalBudgetByJobId,
};
