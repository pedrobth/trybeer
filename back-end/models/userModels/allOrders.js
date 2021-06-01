const connection = require('../connection');

const allOrders = async (userId) => {
  const [result] = await connection.execute('SELECT * FROM sales WHERE user_id = ?', [userId]);
  if (result.length === 0) return null;
  return result;
};

module.exports = allOrders;