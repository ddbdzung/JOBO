const express = require('express');
const validate = require('../../middlewares/validate');
const authController = require('../../controllers/auth.controller');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

module.exports = router;
