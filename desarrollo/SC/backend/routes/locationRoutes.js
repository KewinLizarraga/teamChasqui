const express = require('express');
const Router = express.Router();

const locationController = require('../controllers/locationController.js');
const { auth } = require('../middlewares/auth');

Router.get('/', locationController.getAll);
Router.post('/', auth, locationController.create);

module.exports = Router;
