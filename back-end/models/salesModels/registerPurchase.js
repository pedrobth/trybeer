const connection = require('../connection');

const registerPurchase = async (purchData) => {
  try {
    const { userId, totalPrice, deliveryAddress, deliveryNumber, status, trustedDate } = purchData;
    const response = connection
      .execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, '
        + 'sale_date, status) VALUES (?, ?, ?, ?, ?, ?)', 
      [userId, totalPrice, deliveryAddress, deliveryNumber, trustedDate, status]);
    return response;
  } catch (err) {
    console.log('registerPurchase: ', err);
    return err;
  }
};

module.exports = registerPurchase;