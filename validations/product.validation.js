const Joi = require("joi");

const create = Joi.object({
  price: Joi.number().required(),
  name: Joi.string().required(),
});

const update = Joi.object({
  _id: Joi.string().required(),
  price: Joi.number().optional(),
  name: Joi.string().optional(),
});
const deleteProduct = Joi.object({
  _id: Joi.string().required(),
});

module.exports = { create, update, deleteProduct };
