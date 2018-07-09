const express = require('express');
const Router = express.Router();

const directionController = require('../controllers/directionController.js');
const { auth } = require('../middlewares/auth');

Router.get('/', directionController.getAll);
Router.post('/', auth, directionController.create);
Router.get('/:id/locations', directionController.getLocations);

module.exports = Router;
