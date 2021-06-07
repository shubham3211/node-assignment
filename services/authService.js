const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const userService = require("../services/userService");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

module.exports = { loginUserWithEmailAndPassword };
