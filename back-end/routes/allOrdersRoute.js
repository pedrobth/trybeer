const { Router } = require('express');
const auth = require('../middlewares/auth');
const { allOrders } = require('../controllers');

const allOrdersRoute = Router();

allOrdersRoute.get('/', auth, allOrders);

module.exports = allOrdersRoute;