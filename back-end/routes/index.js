const CheckoutRoute = require('./CheckoutRoute');
const loginRoute = require('./loginRoute');
const RegisterRoute = require('./RegisterRoute');
const ProductsRoute = require('./ProductsRoute');
const updateUser = require('./updateUser');

const allOrders = require('./allOrdersRoute');
const orderDetails = require('./orderDetailsRoute');

const SalesRoute = require('./SalesRoute');

module.exports = {
  CheckoutRoute,
  loginRoute,
  RegisterRoute,
  ProductsRoute,
  updateUser,
  allOrders,
  orderDetails,
  SalesRoute,
};
