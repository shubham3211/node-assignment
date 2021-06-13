const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const userService = require("../services/userService");

const loginUserWithEmailAndPassword = async (username, password) => {
  const user = await userService.getUserByUserName(username);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username or password");
  }
  return user;
};

module.exports = { loginUserWithEmailAndPassword };
