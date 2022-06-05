// const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
// const { User } = require('../models')

const createNewUser = catchAsync(async (req, res) => {
  return res.json(req.body)
  // const user = User.create()
})

module.exports = {
  createNewUser,
};
