const express = require('express');

const validate = require('../../middlewares/validate');
const { fieldValidation } = require('../../validations');
const { fieldController } = require('../../controllers');
// const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(fieldValidation.createField), fieldController.createField);

router.route('/:fieldId').delete(validate(fieldValidation.deleteField), fieldController.deleteField);

module.exports = router;
