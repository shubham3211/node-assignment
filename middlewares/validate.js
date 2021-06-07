const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

const validate = (schema) => (req, res, next) => {
  const { error, ...rest } = schema.validate(req.body);
  if (error) {
    logger.error(error);
    return next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
  return next();
};

module.exports = validate;
