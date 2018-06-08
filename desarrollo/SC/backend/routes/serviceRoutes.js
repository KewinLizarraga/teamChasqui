const express = require('express');
const Router = express.Router();
const serviceController = require('../controllers/serviceController');

Router.get('/', serviceController.getAll);
Router.post('/', serviceController.create);

module.exports = Router;
