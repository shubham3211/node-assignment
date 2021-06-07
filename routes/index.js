const express = require("express");
const router = express.Router();
const authRoute = require("./authRoutes");
const productRoutes = require("./productRoutes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/product",
    route: productRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
