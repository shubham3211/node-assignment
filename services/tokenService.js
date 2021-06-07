const JWT = require("jsonwebtoken");
const {
  jwt: { secret, accessExpirationHours },
} = require("../config/config");

const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: accessExpirationHours,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, secret, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolve(payload);
    });
  });
};

module.exports = { signAccessToken, verifyAccessToken };
