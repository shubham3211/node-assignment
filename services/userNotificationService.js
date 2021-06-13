const logger = require("../config/logger");
const UserNotification = require("../models/userNotification.model");

const createUserNotification = async ({
  notificationId,
  userId,
  read = false,
  received = false,
}) => {
  try {
    return await UserNotification.create({
      notification: notificationId,
      user: userId,
      read,
      received,
    });
  } catch (error) {
    logger.error(error);
  }
};

const getAllUnReceivedNotificationOfUser = async (userId) => {
  try {
    return await UserNotification.find({
      user: userId,
      received: false,
    }).populate("notification");
  } catch (error) {
    logger.error(error);
  }
};

const getAllUserNotification = async (userId) => {
  try {
    return await UserNotification.find({
      user: userId,
    }).populate("notification");
  } catch (error) {
    logger.error(error);
  }
};

const markUserNotificationsAsReceived = async (usernotificationsIds) => {
  try {
    return await UserNotification.updateMany(
      { _id: { $in: usernotificationsIds } },
      { received: true }
    );
  } catch (error) {
    logger.error(error);
  }
};

const markUserNotificationAsRead = async (userNotificationId) => {
  try {
    return await UserNotification.updateOne(
      { _id: userNotificationId },
      { read: true }
    );
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  createUserNotification,
  getAllUnReceivedNotificationOfUser,
  markUserNotificationsAsReceived,
  getAllUserNotification,
  markUserNotificationAsRead,
};
