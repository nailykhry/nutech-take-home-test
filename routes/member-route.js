const express = require('express');
const router = express.Router();

const memberController = require('../app/controllers/membership/member-controller');
const authMiddleware = require('../app/middlewares/auth');

router.get('/profile', authMiddleware, memberController.show);
router.put('/profile/update', authMiddleware, memberController.update);
router.put('/profile/image', authMiddleware, memberController.updateImage);

module.exports = router;
