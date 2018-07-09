const express = require('express');
const Router = express.Router();

const messageController = require('../controllers/messageController.js');

Router.get('/', messageController.getAll);
Router.post('/', messageController.create);

module.exports = Router;
