const { Router } = require('express');

const router = Router();

const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController');
const logoutController = require('../controllers/logoutController');

router.post('/login', loginController.loginHandler)
router.post('/signup', loginController.signupHandler);
router.get('/logout', logoutController.logoutHandler);

module.exports = router;