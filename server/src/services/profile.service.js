/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const { ClientProfile, JobberProfile, User } = require('../models');
const { userService, jobService } = require('./index')
const ApiError = require('../utils/ApiError');

/**
 * Get client profile by its id
 * @param {String} profileId id
 * @returns {Promise<ClientProfile>}
 */
const getClientProfileById = async (profileId) => {
  return ClientProfile.findById(profileId)
}

/**
 * Create client profile by user id
 * @param {Object} profileBody 
 * @returns {Promise<ClientProfile>}
 */
const createClientProfile = async (profileBody) => {
  return ClientProfile.create(profileBody)
}

/**
 * Get hireling profile by its id
 * @param {String} profileId id
 * @returns {Promise<JobberProfile>}
 */
const getJobberProfileById = async (profileId) => {
  return JobberProfile.findById(profileId)
}

/**
 * Create client profile by user id
 * @param {Object} profileBody 
 * @returns {Promise<JobberProfile>}
 */
 const createJobberProfile = async (profileBody) => {
  return JobberProfile.create(profileBody)
}

/**
 * Delete client and jobber profile of a user
 * @param {String} userId 
 * @returns {Promise<{ClientProfile, JobberProfile}>}
 */
const deleteProfileByUserId = async (userId) => {
  const user = await userService.getUserById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { clientProfileId, jobberProfileId } = user
  Promise.all([getClientProfileById(clientProfileId), getJobberProfileById(jobberProfileId)])
    .then(([clientProfile, jobberProfile]) => {
      clientProfile.remove()
      jobberProfile.remove()
      return {
        clientProfile,
        jobberProfile,
      }
    })
    .catch(err => {
      throw new ApiError(httpStatus.NOT_FOUND, err.message)
    })
}

const getClientProfileByUserId = async (userId) => {
  const user = await User
                        .findById(userId)
                        .populate('clientProfileId')
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const profile = user?.clientProfileId
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No client profile found')
  }

  return profile
}

const getJobberProfileByUserId = async (userId) => {
  const user = await User
                        .findById(userId)
                        .populate('jobberProfileId')
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const profile = user?.jobberProfileId
  if (!profile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No hireling profile found')
  }

  return profile
}

/**
 * Add a jobId to one of three properties in client model
 * @param {String} userId 
 * @param {String} jobId 
 * @param {String} option ['open', 'active', 'past']
 * @returns {Promise<ClientProfile>}
 */
const addJobIdToOptionProject = async (userId, jobId, option) => {
  option += 'Project'
  const rule = [
    'openProject',
    'activeProject',
    'pastProject',
  ]
  if (!rule.includes(option)) {
    throw new Error(`Invalid option '${option}'`)
  }

  const profile = await getClientProfileByUserId(userId)
  // Check if profile[option] has jobId => Can not push jobId anymore
  if (profile[option].includes(jobId)) {
    throw new ApiError(httpStatus.FORBIDDEN, `'${option}' has already had jobId '${jobId}'`)
  }

  // Remove jobId if existing in other property
  const [restOpt1, restOpt2] = rule.filter(opt => opt !== option)
  profile[restOpt1] = profile[restOpt1].filter(id => id.toString() !== jobId)
  profile[restOpt2] = profile[restOpt2].filter(id => id.toString() !== jobId)

  // Add jobId to profile[option]
  profile[option].push(jobId)

  // Update profile
  // ClientProfile.updateOne()
  await profile.save()
  
  return profile
}

/**
 * 
 * @param {String<Array>} jobIds 
 * @returns totalBudget
 */
const getTotalBudgetByJobId = async (jobIds) => {
  let budget = 0
  jobIds.foreach(async jobId => {
    const job = await jobService.getJobById(jobId)
    budget += parseFloat(job.budget)
  })
  return budget
}

/**
 * 
 * @param {String} userId 
 * @param {String} jobId Only 1 jobId can be updated each time.
 * @returns updated jobber Profile
 */
const updateJobberProfileByUserId = async (userId, jobId, fieldId, skill) => {
  const jobberProfile = await getJobberProfileByUserId(userId)
  jobberProfile.jobCompleted.push(jobId)
  // Chưa áp dụng Lodash Lib vào xử lý phần tử trùng lặp khi add thêm fieldId trùng lặp
  fieldId.foreach(item => {
    jobberProfile.field.push(item)
  })
  // Chưa áp dụng Lodash Lib vào xử lý phần tử trùng lặp khi add thêm skill trùng lặp
  skill.foreach(item => {
    jobberProfile.skill.push(item)
  })
  jobberProfile.totalBudget = getTotalBudgetByJobId()
  return jobberProfile
}

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
}