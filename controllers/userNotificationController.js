const httpStatus = require("http-status");
const {
  getAllUserNotification, markUserNotificationAsRead,
} = require("../services/userNotificationService");
const catchAsync = require("../utils/catchAsync");

const getUserNotifications = catchAsync(async (req, res) => {
  const userNotifications = await getAllUserNotification(req.locals.user._id);
  res.send({
    userNotifications,
  });
});

const updateUserNotification = catchAsync(async (req, res) => {
  await markUserNotificationAsRead(req.params.userNotificationId);
  res.send({
    message: "Notification Read",
  });
});

module.exports = { getUserNotifications, updateUserNotification };
