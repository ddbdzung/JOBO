// const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');

const database = require('../../fakeDatabase');

const getProfile = catchAsync(async (req, res) => {
  const { userId } = req.params
  const user = database.user.find(item => item.userId === userId)
  return res.json({ user })
});

module.exports = {
  getProfile,
};
