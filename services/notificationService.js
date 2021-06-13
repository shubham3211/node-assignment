const logger = require("../config/logger");
const { Notification } = require("../models");

const createNotification = async (content) => {
  try {
    return await Notification.create({ content });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { createNotification };
