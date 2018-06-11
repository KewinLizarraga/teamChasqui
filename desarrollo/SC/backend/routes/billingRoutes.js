const express = require('express');
const Router = express.Router();
const billingController = require('../controllers/billingController');
const { auth } = require('../middlewares/auth');
const { isSubscribed } = require('../middlewares/subscription');

Router.post('/', auth, isSubscribed, billingController.pay_and_register);

module.exports = Router;
