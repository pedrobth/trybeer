const connection = require('../connection');

const getAll = async () => {
  try {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getAll;
