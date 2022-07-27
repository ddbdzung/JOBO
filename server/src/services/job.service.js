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

  let jobberIdIndex;
  let alreadyHaveJobberId = false;
  let hasJobberNeotiationToUpdate = false;
  let countJoinedMember = 0;
  if (updateBody.jobberNegotiation) {
    hasJobberNeotiationToUpdate = true;
    const jobberId = updateBody.jobberNegotiation.jobberUser.toString();

    job.jobberNegotiation.forEach((item, index) => {
      if (item.status === 'joined') {
        countJoinedMember += 1;
      }
      if (item.jobberUser.toString() === jobberId && alreadyHaveJobberId === false) {
        alreadyHaveJobberId = true;
        jobberIdIndex = index;
      }
    });

    // Không cho phép client tự ứng tuyển vào job của chính mình
    if (job.clientUser.toString() === jobberId) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Client is not allowed to self-apply to own job');
    }
  }
  if (hasJobberNeotiationToUpdate) {
    // Số lượng jobber đã tối đa
    // Và
    // JobberNegotiation có trạng thái 'Joined'
    // => Không cho thêm
    if (job.maxJobber === countJoinedMember && updateBody.jobberNegotiation.status === 'joined') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Can not exceed maximum joined jobber');
    }
    // Không phải là hành động cập nhật jobberNegotiation đã tồn tại
    // => Tạo thêm jobberNegotitation mới
    if (alreadyHaveJobberId === false) {
      job.jobberNegotiation.push(updateBody.jobberNegotiation);
    }
    // Updatebody sẽ ghi đè lên job.jobberNegotiation => mất dữ liệu
    // Cập nhật job.jobberNegotiation bằng tay
    if (alreadyHaveJobberId === true && jobberIdIndex >= 0) {
      Object.assign(job.jobberNegotiation[jobberIdIndex], updateBody.jobberNegotiation);
    }
  }

  // Update job không ghi đè jobberNegotiation
  // eslint-disable-next-line no-param-reassign
  delete updateBody.jobberNegotiation;
  Object.assign(job, updateBody);

  await job.save();
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
  await job.remove();
  return job;
};

const getJobs = async (clientUserId) => {
  const jobs = await Job.find({ clientUserId });
  return jobs;
};

module.exports = {
  createJob,
  queryJobs,
  getJobById,
  getJobByEmail,
  updateJobById,
  deleteJobById,

  getJobs,
};
