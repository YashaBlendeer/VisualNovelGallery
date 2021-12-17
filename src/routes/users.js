'use strict';

const router = require('express').Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  //checkRole,
  userRegister,
  serializeUser,
} = require('../utils/Auth');

// Users Registeration Route
router.post('/register-user', async (req, res) => {
  await userRegister(req.body, 'user', res);
});

// Admin Registration Route
router.post('/register-admin', async (req, res) => {
  await userRegister(req.body, 'admin', res);
});

// Users Login Route
router.post('/login-user', async (req, res) => {
  await userLogin(req.body, 'user', res);
});

// Admin Login Route
router.post('/login-admin', async (req, res) => {
  await userLogin(req.body, 'admin', res);
});

// Profile Route
router.get('/profile', userAuth, async (req, res) =>
  res.json(serializeUser(req.user))
);

module.exports = router;
