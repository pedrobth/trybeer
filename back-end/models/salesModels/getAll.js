const connection = require('../connection');

const getAll = async () => {
  try {
    const [sales] = await connection.execute('SELECT * FROM sales');
    return sales;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getAll;
