const connection = require('../connection');

const updateUser = async (id, name) => {
    const result = await connection.execute('UPDATE users SET name = ? WHERE id = ?', [name, id]);
    if (!result) return null;
    return { name };
};

module.exports = updateUser;