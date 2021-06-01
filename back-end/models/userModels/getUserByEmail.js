const connection = require('../connection');

const getUserByEmail = async (email) => {
  try {
    const [[user]] = await connection
      .execute('SELECT id, name, password, role FROM users WHERE email=?', [email]);
      if (user === undefined) return null;
    return user;
  } catch (err) {
    return { err };
  }
};

module.exports = getUserByEmail;