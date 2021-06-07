const { verifyAccessToken } = require("../services/tokenService");
const httpStatus = require("http-status");

const validateJwt = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: "token required" });
    }
    const token = req.headers["authorization"].split(" ")[1];
    const payload = await verifyAccessToken(token);
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.user = payload;
    next();
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }
};

module.exports = { validateJwt };
