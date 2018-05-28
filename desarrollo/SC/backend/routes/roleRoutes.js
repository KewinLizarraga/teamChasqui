const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

router.get('/', roleController.getAll);
router.post('/', roleController.create);

module.exports = router;
