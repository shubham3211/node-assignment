const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");
const authService = require("../services/authService");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.signAccessToken({
    _id: user._id,
    role: user.role,
  });
  res.status(httpStatus.CREATED).send({
    user: { _id: user._id, name: user.name, email: user.email },
    tokens,
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.signAccessToken({
    _id: user._id,
    role: user.role,
  });
  res.send({
    user: { _id: user._id, username: user.username },
    tokens,
  });
});

module.exports = { register, login };
