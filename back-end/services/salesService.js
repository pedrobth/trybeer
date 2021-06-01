const salesModel = require('../models/salesModels');
const { errorInDb, OK } = require('./dictionaries/statusMsgMap');

const getAll = async () => {
  try {
    const sales = await salesModel.getAll();
    return { sales, ...OK };
  } catch (error) {
    return errorInDb;
  }
};

const getById = async (id) => {
  try {
    const sale = await salesModel.getById(id);
    return { sale, ...OK };
  } catch (error) {
    return errorInDb;
  }
};

const updateStatus = async (id) => {
  try {
    await salesModel.updateStatus(id);
    return OK;
  } catch (error) {
    return errorInDb;
  }
};

module.exports = { getAll, getById, updateStatus };
