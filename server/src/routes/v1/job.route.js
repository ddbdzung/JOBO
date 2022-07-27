const express = require('express');
// const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobController = require('../../controllers/job.controller');
const { jobValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  // .post(jobController.createJob).get(jobController.getJobs);
  .post(validate(jobValidation.createJob), jobController.createJob)
router
  .route('/:jobId')
  .get(jobController.getJob)
  .patch(jobValidation.updateJob, jobController.updateJob)
//   .delete(jobController.deleteJob);

module.exports = router;
