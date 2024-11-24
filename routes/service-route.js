const express = require('express');
const router = express.Router();

const serviceController = require('../app/controllers/information/service-controller');
const authMiddleware = require('../app/middlewares/auth');

router.get('/service', authMiddleware, serviceController.index);

module.exports = router;
