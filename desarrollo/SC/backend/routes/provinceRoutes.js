const express = require('express');
const Router = express.Router();

const provinceController = require('../controllers/provinceController');

Router.get('/', provinceController.getAll);

module.exports = Router;
