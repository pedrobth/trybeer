const { productServ } = require('../services');

const getProducts = async (req, res, next) => {
  try {
    const products = await productServ.getProducts();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return next({ err, status: 'Internal server error' });
  }
};

module.exports = { getProducts };
