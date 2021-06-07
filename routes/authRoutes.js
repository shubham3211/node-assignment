const express = require("express");
const router = express.Router();
const authValidation = require("../validations/auth.validation");
const validate = require("../middlewares/validate");
const { authController } = require("../controllers");

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
