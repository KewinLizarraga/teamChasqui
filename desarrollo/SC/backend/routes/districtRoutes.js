const express = require('express');
const Router = express.Router();

const districtController = require('../controllers/districtController');

Router.get('/', districtController.getAll);

module.exports = Router;
