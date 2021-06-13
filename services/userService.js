const httpStatus = require("http-status");
const logger = require("../config/logger");
const { User } = require("../models");
var ObjectId = require("mongodb").ObjectId;

const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
  if (await User.isUserNameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  const user = await User.create(userBody);
  return user;
};

const getUserByUserName = async (username) => {
  return User.findOne({ username });
};

const getUsersFromBranches = async (branchIds) => {
  return await User.find({
    branchId: { $in: branchIds },
  });
};

module.exports = { createUser, getUserByUserName, getUsersFromBranches };
