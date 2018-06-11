const express = require('express');
const Router = express.Router();

const districtController = require('../controllers/districtController');

Router.get('/', districtController.getAll);
Router.get('/:id',districtController.getOne);

module.exports = Router;
