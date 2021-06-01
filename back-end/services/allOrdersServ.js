const { allOrders } = require('../models/userModels');
const { dbSearchReturnedEmpty } = require('./dictionaries/statusMsgMap');

const allOrdersServ = async (userId) => {
    try {
        const result = await allOrders(userId);
        if (!result) return dbSearchReturnedEmpty;
        return { message: result, status: 200 };
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = allOrdersServ;