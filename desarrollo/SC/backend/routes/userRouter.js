const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/users', auth.auth, userController.getAll);
router.post('/users/:id', auth.auth, userController.updateUser);
router.post('/login', userController.login);
router.post('/logout', auth.auth, userController.logout);
router.post('/signup', userController.signup);
router.post('/confirmation', userController.confirmation);
router.post('/resend', userController.resend);

module.exports = router;
