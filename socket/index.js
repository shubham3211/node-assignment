const redisAdapter = require("socket.io-redis");
const { verifyAccessToken } = require("../services/tokenService");
const { getBranchesByPincode } = require("../services/branchService");
const {
  getUsersFromBranches,
  getUserByUserName,
} = require("../services/userService");
const { createNotification } = require("../services/notificationService");
const {
  createUserNotification,
  getAllUnReceivedNotificationOfUser,
  markUserNotificationsAsReceived,
} = require("../services/userNotificationService");
const config = require("../config/config");

const redis = require("redis").createClient(
  config.redis.port,
  config.redis.host,
  {
    password: config.redis.password,
  }
);

redis.on("connect", () => {
  console.log("Redis Connected");
  require("bluebird").promisifyAll(redis);
});

function initializeSocketConnection(io) {
  io.adapter(
    redisAdapter({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    })
  );

  io.use(async (socket, next) => {
    try {
      const user = await verifyAccessToken(socket.handshake.auth.token);
      socket.user = user;
      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  });

  io.on("connection", async (socket) => {
    await redis.setAsync(`${socket.user._id}`, socket.id);
    const sendUnReceivedNotificationOfCurrentUser = async () => {
      try {
        const unReceivedUserNotifications =
          await getAllUnReceivedNotificationOfUser(socket.user._id);
        unReceivedUserNotifications.forEach((userNotification) => {
          io.to(socket.id).emit(
            "notification",
            userNotification.notification.content
          );
        });
        await markUserNotificationsAsReceived(
          unReceivedUserNotifications.map(
            (unReceivedUserNotification) => unReceivedUserNotification._id
          )
        );
      } catch (error) {
        logger.error(error);
      }
    };

    await sendUnReceivedNotificationOfCurrentUser();

    socket.on("disconnect", async () => {
      try {
        console.log(socket.id, "disconnecting");
        await redis.delAsync(`${socket.user._id}`);
      } catch (error) {
        logger.error(error);
      }
    });

    const sendNotificationToUsers = async (userIds, notification) => {
      try {
        const admin = await getUserByUserName("admin");
        userIds.push(admin._id);
        for (let userId of userIds) {
          const userSocketId = await redis.getAsync(`${userId}`);
          if (userSocketId) {
            io.to(userSocketId).emit("notification", notification.content);
            await createUserNotification({
              notificationId: notification._id,
              userId,
              received: true,
            });
          } else {
            await createUserNotification({
              notificationId: notification._id,
              userId,
            });
          }
        }
      } catch (error) {
        logger.error(error);
      }
    };

    socket.on("create notification", async (pincode, content) => {
      try {
        const notificationCreated = await createNotification(content);
        const branches = await getBranchesByPincode(pincode);
        const users = await getUsersFromBranches(
          branches.map((branch) => branch._id)
        );
        sendNotificationToUsers(
          users.map((user) => user._id),
          notificationCreated
        );
      } catch (error) {
        logger.error(error);
      }
    });
  });
}

module.exports = { initializeSocketConnection };
