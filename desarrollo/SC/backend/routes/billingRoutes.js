const express = require('express');
const Router = express.Router();
const billingController = require('../controllers/billingController');
const { auth } = require('../middlewares/auth');

Router.post('/', auth, billingController.pay_and_register);

module.exports = Router;
