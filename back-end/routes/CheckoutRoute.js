const { Router } = require('express');
const auth = require('../middlewares/auth');
const { checkoutCtrl } = require('../controllers');

const CheckoutRoute = Router();

CheckoutRoute.post('/', auth, checkoutCtrl);

module.exports = CheckoutRoute;