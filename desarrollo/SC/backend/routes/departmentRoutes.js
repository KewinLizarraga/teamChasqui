const express = require('express');
const Router = express.Router();

const departmentController = require('../controllers/departmentController');

Router.get('/', departmentController.getAll);

module.exports = Router;
