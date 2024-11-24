const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/membership/auth-controller');

router.post('/registration', authController.regist);
router.post('/login', authController.login);

module.exports = router;
