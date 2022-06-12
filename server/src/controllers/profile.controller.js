const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { profileService, userService } = require('../services')

// [GET /api/v1/p/client/:userId]
const getClientProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  return res.json({
    clientProfile: await profileService.getClientProfileByUserId(userId),
  })
});

// [POST /api/v1/p/client/:userId]
const createClientProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  const profileBody = null
  const user = await userService.getUserById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const clientProfileId = user?.clientProfileId
  if (clientProfileId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Profile has already been created')
  }

  const { _id } = await profileService.createClientProfile(profileBody)
  user.clientProfileId = _id
  const updatedUser = await userService.updateUserById(userId, user)
  return res.send(updatedUser)
})

// [PUT /api/v1/p/client/:userId?option=]
const updateClientProfile = catchAsync(async (req, res) => {
  const { jobId } = req.body
  const { userId } = req.params
  const { option } = req.query
  const profile = await profileService.addJobIdToOptionProject(userId, jobId, option)
  
  return res.send(profile)
})

// [GET /api/v1/p/jobber/:userId]
const getJobberProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  return res.json({
    jobberProfile: await profileService.getJobberProfileByUserId(userId)
  })
});

// [POST /api/v1/p/jobber/:userId]
const createJobberProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  const profileBody = null
  const user = await userService.getUserById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const jobberProfileId = user?.jobberProfileId
  if (jobberProfileId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Profile has already been created')
  }

  const { _id } = await profileService.createJobberProfile(profileBody)
  user.jobberProfileId = _id
  const updatedUser = await userService.updateUserById(userId, user)
  return res.send(updatedUser)
})

// [PUT /api/v1/p/test/:userId]
const test = catchAsync(async (req, res) => {
  const { jobId } = req.body
  const { userId } = req.params
  const profile = await profileService.addJobIdToOptionProject(userId, jobId, 'open')
  
  return res.send(profile)
})

module.exports = {
  getClientProfile,
  createClientProfile,
  updateClientProfile,
  getJobberProfile,
  createJobberProfile,
  test,
};
