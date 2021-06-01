const { updateUser } = require('../models/userModels');
const { dbSearchReturnedEmpty } = require('./dictionaries/statusMsgMap');

const updateUserService = async (id, name) => {
    try {
        const checkUserExists = await updateUser(id, name);
        if (!checkUserExists) return dbSearchReturnedEmpty;
        return { message: checkUserExists, status: 201 };
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports = updateUserService;