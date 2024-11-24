const express = require('express');
const router = express.Router();

const bannerController = require('../app/controllers/information/banner-controller');

router.get('/banner', bannerController.index);

module.exports = router;
