const express = require('express');
const Router = express.Router();

const invoiceController = require('../controllers/invoiceController.js');

Router.get('/', invoiceController.getAll);
Router.post('/', invoiceController.create);

module.exports = Router;
