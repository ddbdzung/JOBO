const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createField = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
  }),
};

const deleteField = {
  params: Joi.object().keys({
    fieldId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createField,
  deleteField,
};
