const { orderDetails } = require('../models/userModels');
const { dbSearchReturnedEmpty } = require('./dictionaries/statusMsgMap');

const orderDetailsServ = async (orderId) => {
    try {
        const result = await orderDetails(orderId);
        
        if (!result) return dbSearchReturnedEmpty;
        
        return { message: result, status: 200 };
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = orderDetailsServ;