const express = require("express");
const router = express.Router();
const { userNotificationController } = require("../controllers");
const { validateJwt } = require("../middlewares/validateJwt");

router.get(
  "/all-notification",
  validateJwt,
  userNotificationController.getUserNotifications
);
router.put(
  "/update-notification/:userNotificationId",
  validateJwt,
  userNotificationController.updateUserNotification
);

module.exports = router;
