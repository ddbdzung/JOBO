const express = require('express');
// const { auth } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const jobController = require('../../controllers/job.controller');
const { jobValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(jobController.getJobs).post(validate(jobValidation.createJob), jobController.createJob);

router.route('/cId=:clientUserId').get(validate(jobValidation.getOwnJobs), jobController.getOwnJobs);

router
  .route('/:jobId')
  // .get(jobController.getJob)
  .patch(validate(jobValidation.updateJob), jobController.updateJob)
  // .patch(jobController.updateJob)
  .delete(validate(jobValidation.deleteJob), jobController.deleteJob);

module.exports = router;
