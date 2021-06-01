const connection = require('../connection');

const orderDetails = async (orderId) => {
    const [result] = await connection.execute(
    'SELECT sales.id ,sales.sale_date,product.quantity,sales.delivery_number AS'
        + ' number_order,products_info.price * product.quantity AS'
        + ' total_item_price,product.product_id,products_info.name FROM sales'
        + ' INNER JOIN sales_products AS product'
        + ' ON sales.id = product.sale_id' 
        + ' INNER JOIN products AS products_info'
        + ' ON product.product_id = products_info.id'
        + ' WHERE sales.id = ?', [orderId],
);
        
    if (result.length === 0) return null;
    return result;
};

module.exports = orderDetails;