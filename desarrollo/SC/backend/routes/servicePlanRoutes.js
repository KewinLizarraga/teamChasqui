const express = require('express');
const router = express.Router();
const servicePlanController = require('../controllers/servicePlanController');
const { authAdmin } = require('../middlewares/auth');

router.get('/', servicePlanController.getAll);
router.post('/', authAdmin, servicePlanController.create);

module.exports = router;
