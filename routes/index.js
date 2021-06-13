const express = require("express");
const router = express.Router();
const authRoute = require("./authRoutes");
const userNotificationRoutes = require("./userNotificationRoutes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user-notifications",
    route: userNotificationRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
