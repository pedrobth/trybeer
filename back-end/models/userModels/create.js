const connection = require('../connection');

const create = async ({ name, email, password, role }) => {
  const conn = await connection;
  await conn.execute('INSERT INTO users (name, email, password, role) ' 
    + 'VALUES (?, ?, ?, ?)', [name, email, password, role]);
};

module.exports = create;
