const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jobService, profileService } = require('../services');

const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body);
  // Tự động gán jobId vào client profile với trạng thái "open"
  await profileService.addJobIdToOptionProject(job.clientUser, job._id, 'open');
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const getOwnJobs = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const jobs = await jobService.queryJobs(filter, options)
  // res.send(jobs)
  const { clientUserId } = req.params;
  const jobs = await jobService.getJobs(clientUserId);
  res.send(jobs);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJobById(req.params.jobId, req.body);
  let profileStatus;
  switch (job.status) {
    case 'pending':
      profileStatus = 'open';
      break;
    case 'active':
      profileStatus = 'active';
      break;
    case 'done':
      profileStatus = 'past';
      break;

    default:
      profileStatus = 'open';
      break;
  }
  // Tự động cập nhật lại trạng thái job trong client profile
  profileService.addJobIdToOptionProject(job.clientUser, job._id, profileStatus);
  res.send(job);
});

const deleteJob = catchAsync(async (req, res) => {
  await jobService.deleteJobById(req.params.jobId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createJob,
  getJobs,
  getJob,
  getOwnJobs,
  updateJob,
  deleteJob,
};
