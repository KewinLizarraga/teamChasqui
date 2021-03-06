const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.get('/', auth.auth, userController.getAll);
router.post('/:id', auth.auth, userController.updateUser);
router.delete('/deleteUser', auth.authAdmin, userController.deleteUser);

module.exports = router;
