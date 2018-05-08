const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/login', authController.login);
router.post('/logout', auth.auth, authController.logout);
router.post('/signup', authController.signup);
router.post('/confirmation', authController.confirmation);
router.post('/resend', authController.resend);
router.post('/forgot', authController.forgot);
router.post('/reset', authController.reset);
router.post('/validateConfirmation', authController.validateConfirmation);
router.post('/validateForgot', authController.validateForgot);

module.exports = router;
