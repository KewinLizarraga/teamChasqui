const express = require('express');
const Router = express.Router();

const replyController = require('../controllers/replyController.js');
const { auth } = require('../middlewares/auth');

Router.get('/', replyController.getAll);
Router.post('/', auth, replyController.create);
Router.put('/:id', auth, replyController.update);

module.exports = Router;
