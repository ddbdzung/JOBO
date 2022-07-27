const Joi = require('joi').extend(require('@joi/date'));
const { objectId } = require('./custom.validation');

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    workPattern: Joi.string().required().valid('online', 'offline', 'hybrid'),
    workTime: Joi.string().required().valid('fullTime', 'partTime', 'onProject'),
    paymentMethod: Joi.string().required().valid('perHour', 'perMonth', 'perProject'),
    location: Joi.string(),
    endTime: Joi.date().required().format('DD-MM-YYYY').greater('now'),
    maxJobber: Joi.number().required().min(1),
    budget: Joi.number().required().min(0),
    status: Joi.string().default('pending').valid('pending', 'active', 'done'),
    clientUser: Joi.string().required().custom(objectId),
    fields: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const deleteJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
};

const updateJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    workPattern: Joi.string().valid('online', 'offline', 'hybrid'),
    workTime: Joi.string().valid('fullTime', 'partTime', 'onProject'),
    paymentMethod: Joi.string().valid('perHour', 'perMonth', 'perProject'),
    location: Joi.string(),
    endTime: Joi.date().format('DD-MM-YYYY').greater('now'),
    maxJobber: Joi.number().min(1),
    budget: Joi.number().min(0),
    status: Joi.string().valid('pending', 'active', 'done'),
    clientUser: Joi.string().custom(objectId),
    fields: Joi.array().items(Joi.string().custom(objectId)),
    jobberNegotiation: Joi.object().keys({
      jobberUser: Joi.string().custom(objectId).required(),
      persuasionContent: Joi.string().min(15),
      solution: Joi.string(),
      status: Joi.string().valid('pending', 'joined', 'rejected').default('pending'),
    }),
  }),
};

const getOwnJobs = {
  params: Joi.object().keys({
    clientUserId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getOwnJobs,
};
