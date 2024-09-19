const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController')

router.get('/', indexController.indexRender);
router.get('/login', loginController.loginRender);
router.get('/login/otp', otpController.otpRender);

module.exports = router;