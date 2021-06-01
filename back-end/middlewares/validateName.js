const { wrongInput } = require('../services/dictionaries/statusMsgMap');

const validateName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length < 12) {
       return res.status(wrongInput.status).json({
            message: wrongInput.message,
        });
    }
    next();
};

module.exports = validateName;