const express = require('express');

const authRoute = require('./auth.route');
const profileRoute = require('./profile.route');
const userRoute = require('./user.route');
const jobRoute = require("./job.route");

const docsRoute = require('./docs.route');
const config = require('../../config/config');
// const { auth, authorize } = require('../../middlewares/auth');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
];

const userRoutes = [
  {
    path: '/p',
    route: profileRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
