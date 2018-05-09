const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/', businessController.getAll);
// router.get('/setup', businessController.setup);


module.exports = router;
