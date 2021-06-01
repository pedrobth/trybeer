const connection = require('../connection');

const getById = async (id) => {
  try {
    const [sale] = await connection.execute('select * from sales sa ' 
    + 'inner join sales_products sp ' 
    + 'on sp.sale_id = sa.id '
    + 'inner join products pr '
    + 'on pr.id = sp.product_id '
    + 'where sa.id = ?', [id]);
    return sale;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getById;
