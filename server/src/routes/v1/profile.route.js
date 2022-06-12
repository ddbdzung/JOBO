const express = require('express');

const validate = require('../../middlewares/validate');
const { profileValidation } = require('../../validations');
const { profileController } = require('../../controllers');

const router = express.Router();

// router
//   .route('/:userId')
//   .get(validate(profileValidation.getProfile), profileController.getProfile);

router.route('/createNewUser').post(profileController.createNewUser);

module.exports = router;
