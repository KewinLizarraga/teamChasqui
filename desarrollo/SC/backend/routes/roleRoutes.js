const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

router.post('/', roleController.create);

module.exports = router;
