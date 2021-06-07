const Joi = require("joi");

const register = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string().optional(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { register, login };
