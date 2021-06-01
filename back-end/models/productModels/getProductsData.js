const connection = require('../connection');

const getProductsData = async (productsIds) => {
  const response = productsIds.map((id) => connection
    .execute('SELECT * FROM products WHERE id=?', [id]));
  const productsList = await Promise.all(response)
    .then((resp) => resp.map((e) => e[0][0]));
  return productsList;
};

module.exports = getProductsData;
