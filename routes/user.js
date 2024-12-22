const { Router } = require('express');

const router = Router();

const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const resetPasswordController = require('../controllers/resetPasswordController');

router.post('/login', loginController.loginHandler)
router.post('/signup', loginController.signupHandler);
router.get('/logout', logoutController.logoutHandler);
router.get('/reset-password', resetPasswordController.resetPasswordRender);
router.post('/reset-password', resetPasswordController.resetPasswordHandler);

module.exports = router;