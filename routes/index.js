const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');
const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController');
const greetController = require('../controllers/greetController');
const collectionsController = require('../controllers/collectionsController');
const blogCreateController = require('../controllers/blogCreateController');

router.get('/', indexController.indexRender);
router.get('/login', loginController.loginRender);
router.get('/otp', otpController.otpRender);
router.get('/greet', greetController.greetRender);
router.get('/collections', collectionsController.collectionsRender);
router.get('/blog-create', blogCreateController.blogCreateRender);

module.exports = router;