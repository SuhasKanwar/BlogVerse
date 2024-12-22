const express = require('express');

const router = express.Router();

const otpController = require('../controllers/otpController');

router.get('/', otpController.otpRender);

module.exports = router;