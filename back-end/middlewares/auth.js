const jwt = require('jsonwebtoken');
const { missingAuthToken } = require('../services/dictionaries/statusMsgMap');

const secret = process.env.SECRET || '12345';

const validateToken = (token, error, res) => {
  if (!token) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
};

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization;
    if (!token) {
      return res.status(missingAuthToken.status).json({
        message: missingAuthToken.message,
      });
    }
    const checkToken = jwt.verify(token, secret);
    validateToken(token, missingAuthToken, res);
    const { id, role } = checkToken;
    const user = { id, role };
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = auth;
