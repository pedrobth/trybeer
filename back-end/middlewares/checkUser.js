const { allFieldsMustBeFilled } = require('../services/dictionaries/statusMsgMap');

const checkUser = (req, res, next) => {
  const { body } = req;
  const { status, ...rest } = allFieldsMustBeFilled;
  if (!body.name || !body.email || !body.password || body.isSeller === undefined) {
    return res.status(status).json({ ...rest });
  }
  return next();
};

module.exports = checkUser;
