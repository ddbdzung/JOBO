const httpStatus = require('http-status');
const { Job } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a job
 * @param {Object} jobBody
 * @returns {Promise<Job>}
 */
const createJob = async (jobBody) => {
  return Job.create(jobBody);
};

/**
 * Query for jobs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryJobs = async (filter, options) => {
  const jobs = await Job.paginate(filter, options);
  return jobs;
};

/**
 * Get job by id
 * @param {ObjectId} id
 * @returns {Promise<Job>}
 */
const getJobById = async (id) => {
  return Job.findById(id);
};

/**
 * Get job by email
 * @param {string} email
 * @returns {Promise<Job>}
 */
const getJobByEmail = async (email) => {
  return Job.findOne({ email });
};

/**
 * Update job by id
 * @param {ObjectId} jobId
 * @param {Object} updateBody
 * @returns {Promise<job>}
 */
const updateJobById = async (jobId, updateBody) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'job not found');
  }
  Object.assign(job, updateBody);
  await Job.save();
  return job;
};

/**
 * Delete job by id
 * @param {ObjectId} jobId
 * @returns {Promise<job>}
 */
const deleteJobById = async (jobId) => {
  const job = await getJobById(jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'job not found');
  }
  await Job.remove();
  return job;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  getJobByEmail,
  updateJobById,
  deleteJobById,
};