const express = require('express');
const Router = express.Router();

const foodTypeController = require('../controllers/foodTypeController.js');

Router.get('/', foodTypeController.getAll);
Router.post('/', foodTypeController.create);

module.exports = Router;
