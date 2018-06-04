const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authAdmin } = require('../middlewares/auth');


router.get('/', productController.getAll);
router.post('/', authAdmin, productController.create);

module.exports = router;
