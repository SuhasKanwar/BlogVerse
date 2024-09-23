const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController');
const greetController = require('../controllers/greetController');

router.get('/', indexController.indexRender);
router.get('/login', loginController.loginRender);
router.get('/login/otp', otpController.otpRender);
router.get('/greet', greetController.greetRender);

module.exports = router;