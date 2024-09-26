const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController');
const greetController = require('../controllers/greetController');
const blogViewController = require('../controllers/blogViewController');

router.get('/', indexController.indexRender);
router.get('/login', loginController.loginRender);
router.get('/login/otp', otpController.otpRender);
router.get('/greet', greetController.greetRender);
router.get('/blog-view', blogViewController.blogViewRender);

module.exports = router;