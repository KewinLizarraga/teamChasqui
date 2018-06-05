const express = require('express');
const Router = express.Router();

const countryController = require('../controllers/countryController');
const { authAdmin } = require('../middlewares/auth');

Router.get('/', countryController.getAll);

module.exports = Router;
