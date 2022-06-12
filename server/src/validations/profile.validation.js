const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getProfile = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getProfile,
};
