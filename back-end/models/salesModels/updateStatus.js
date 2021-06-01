const connection = require('../connection');

const Entregue = 'Entregue';

const updateStatus = async (id) => {
  try {
    connection
      .execute('UPDATE sales SET status = ? WHERE id = ?', [Entregue, id]);
    return;
  } catch (err) {
    console.log('updateStatus: ', err);
    return err;
  }
};

module.exports = updateStatus;
