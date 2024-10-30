const { Router } = require('express');

const router = Router();

const loginController = require('../controllers/loginController');
const otpController = require('../controllers/otpController');

router.post('/login', loginController.loginHandler)
router.post('/signup', loginController.signupHandler);

module.exports = router;