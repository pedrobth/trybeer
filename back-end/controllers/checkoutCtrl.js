const { Router } = require('express');
const { checkoutServ } = require('../services');

const checkoutCtrl = Router();

checkoutCtrl.post('/', async (req, res, next) => {
  try {
    const { body, user } = req;
    const checkoutRes = await checkoutServ(body, user);
    if (checkoutRes.err) return next(checkoutRes);
    const { error, message, status } = checkoutRes;
    return res.status(status).json({ message, error } || { });
  } catch (err) {
    console.log('controller: ', err);
    return next({ err, status: 'internal server error' });
  }
});

module.exports = checkoutCtrl;
