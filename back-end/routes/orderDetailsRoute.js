const { Router } = require('express');
const auth = require('../middlewares/auth');
const { orderDetails } = require('../controllers');

const orderDetailsRoute = Router();

orderDetailsRoute.get('/:id', auth, orderDetails);

module.exports = orderDetailsRoute;