const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getClientProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const createClientProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
}

const updateClientProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    jobId: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    option: Joi.string().required().valid('open', 'active', 'past'),
  })
}

const getJobberProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const createJobberProfile = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
}

module.exports = {
  getClientProfile,
  createClientProfile,
  updateClientProfile,
  getJobberProfile,
  createJobberProfile,
};
