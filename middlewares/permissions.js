const httpStatus = require("http-status");

const validatePermissions = (allowedRoles) => async (req, res, next) => {
  if (!allowedRoles.includes(req.locals.user.role)) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "Role Unauthorized" });
  }
  next();
};

module.exports = { validatePermissions };
