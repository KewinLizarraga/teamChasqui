const express = require('express');
const Router = express.Router();

const questionController = require('../controllers/questionController.js');
const { auth } = require('../middlewares/auth');

Router.get('/', questionController.getAll);
Router.post('/', auth, questionController.create);
Router.post('/:id/replies', questionController.getReplies);

module.exports = Router;
