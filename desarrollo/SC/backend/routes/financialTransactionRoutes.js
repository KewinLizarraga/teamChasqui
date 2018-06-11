const express = require('express');
const Router = express.Router();

const financialTransactionController = require('../controllers/financialTransactionController.js');

Router.get('/', financialTransactionController.getAll);
Router.post('/', financialTransactionController.create);

module.exports = Router;
