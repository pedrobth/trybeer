const checkoutServ = require('./checkoutServ');
const loginServ = require('./loginServ');
const productServ = require('./productServ');
const salesService = require('./salesService');
const updateUser = require('./updateUser');
const allOrders = require('./allOrdersServ');
const orderDetails = require('./orderDetailsServ');

module.exports = {
  checkoutServ,
  loginServ,
  productServ,
  updateUser,
  allOrders,
  orderDetails,
  salesService,
};
