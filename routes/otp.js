const express = require('express');

const router = express.Router();

const otpController = require('../controllers/otpController');

router.get('/', otpController.otpRender);
router.post('/validate', otpController.otpValidate);

module.exports = router;