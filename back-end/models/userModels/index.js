const create = require('./create');
const getUserByEmail = require('./getUserByEmail');
const updateUser = require('./updateUser');
const allOrders = require('./allOrders');
const orderDetails = require('../productModels/orderDetails');

module.exports = {
  create,
  getUserByEmail,
  updateUser,
  allOrders,
  orderDetails,
};
