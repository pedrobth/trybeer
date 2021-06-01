const registerServ = require('../services/registerServ');

const registerCtrl = async (req, res, next) => {
  try {
    const { body } = req;
    const loginRes = await registerServ(body);
    if (loginRes.err) return next(loginRes);
    const { status, ...rest } = loginRes;
    return res.status(status).json({ ...rest });
  } catch (err) {
    console.log(err);
    return next({ err, status: 'Internal server error' });
  }
};

module.exports = registerCtrl;