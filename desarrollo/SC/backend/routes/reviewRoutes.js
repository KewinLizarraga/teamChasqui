const express = require('express');
const Router = express.Router();

const reviewController = require('../controllers/reviewController.js');
const { auth, authAdmin } = require('../middlewares/auth');
const { isOwner } = require('../middlewares/reviews');

Router.get('/', reviewController.getAll);
Router.post('/', auth, reviewController.create);
Router.put('/:id',auth , isOwner, reviewController.update);

module.exports = Router;
