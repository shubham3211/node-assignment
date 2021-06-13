const mongoose = require("mongoose");

const userNotificationSchema = mongoose.Schema({
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  read: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  received: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
});

const UserNotification = mongoose.model(
  "UserNotification",
  userNotificationSchema
);

module.exports = UserNotification;
