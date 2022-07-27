const express = require('express');

const validate = require('../../middlewares/validate');
const { profileValidation } = require('../../validations');
const { profileController } = require('../../controllers');
// const { auth } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/client/:userId')
  .get(validate(profileValidation.getClientProfile), profileController.getClientProfile)
  .post(validate(profileValidation.createClientProfile), profileController.createClientProfile)
  .put(validate(profileValidation.updateClientProfile), profileController.updateClientProfile);

router
  .route('/jobber/:userId')
  .get(validate(profileValidation.getJobberProfile), profileController.getJobberProfile)
  .post(validate(profileValidation.createJobberProfile), profileController.createJobberProfile)
  .put(validate(profileValidation.updateJobberProfile), profileController.updateJobberProfile);

module.exports = router;
