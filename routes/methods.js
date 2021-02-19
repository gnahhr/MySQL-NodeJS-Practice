//User-related methods
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

//Register
router.post('/register_user', authController.register);

//Log in
router.post('/log-in_user', authController.login_user);

//Log in
router.post('/log-in_admin', authController.login_admin);

//Show Log
router.post('/show-log', authController.showLog);

module.exports = router;