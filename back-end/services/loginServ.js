const jwt = require('jsonwebtoken');
const preCheckFields = require('./helpers/validateFields');
const { allFieldsMustBeFilled,
  wrongPassword,
  dbSearchReturnedEmpty,
  errorInDb } = require('./dictionaries/statusMsgMap');
const { getUserByEmail } = require('../models/userModels');

const checkUser = async (body) => {
  if (!preCheckFields(['email', 'password'], [body])) return allFieldsMustBeFilled;
  const { email, password } = body;
  const userInDb = await getUserByEmail(email);
  if (!userInDb) return dbSearchReturnedEmpty;
  if (password !== userInDb.password) return wrongPassword;
  if (userInDb.err) return errorInDb;
  return userInDb;
};

const loginServ = async (body) => {
  try {
    const checkUserRes = await checkUser(body);
    if (checkUserRes.error) return checkUserRes;
    const { email } = body;
    const { id, name, role } = checkUserRes;
    const payload = { id, role };
    const token = jwt.sign(payload, process.env.SECRET || '12345');
    const msgRes = { name, email, role, token };
    return { message: msgRes, status: 200 };
  } catch (err) {
    console.log('error: ', err);
    return err;
  }
};

module.exports = loginServ;