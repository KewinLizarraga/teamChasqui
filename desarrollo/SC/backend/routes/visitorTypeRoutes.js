const express = require('express');
const Router = express.Router();

const visitorTypeController = require('../controllers/visitorTypeController.js');
const { authAdmin } = require('../middlewares/auth');

Router.get('/', visitorTypeController.getAll);
Router.post('/', authAdmin, visitorTypeController.create);

module.exports = Router;
