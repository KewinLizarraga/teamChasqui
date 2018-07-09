const express = require('express');
const Router = express.Router();

const chatController = require('../controllers/chatController.js');
const { auth } = require('../middlewares/auth');

Router.get('/', chatController.getAll);
Router.get('/:id', chatController.getOne);
Router.get('/:id/messages', chatController.getMessages);
Router.post('/', auth, chatController.create);

module.exports = Router;
