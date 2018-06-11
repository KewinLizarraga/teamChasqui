const express = require('express');
const Router = express.Router();

const moneyTypeController = require('../controllers/moneyTypeController');
const { authAdmin } = require('../middlewares/auth');

Router.get('/', moneyTypeController.getAll);
Router.post('/', authAdmin, moneyTypeController.create);

module.exports = Router;
