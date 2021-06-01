const productModels = require('../models/productModels');
const { errorInDb } = require('./dictionaries/statusMsgMap');

const getProducts = async () => {
  try {
    return productModels.getAll();
  } catch (error) {
    return errorInDb;
  }
};

module.exports = { getProducts };
