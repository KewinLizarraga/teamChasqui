const express = require('express');
const Router = express.Router();
const serviceController = require('../controllers/serviceController');
const { authAdmin } = require('../middlewares/auth');

Router.get('/', serviceController.getAll);
Router.post('/', authAdmin, serviceController.create);

module.exports = Router;
