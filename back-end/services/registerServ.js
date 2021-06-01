const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');
const { created, emailInDatabase } = require('./dictionaries/statusMsgMap');

const registerServ = async (body) => {
  const { name, email, password, isSeller } = body;

  const alreadyExists = await userModel.getUserByEmail(email);
  if (alreadyExists) return emailInDatabase;

  const role = isSeller ? 'administrator' : 'client';
  await userModel.create({ name, email, password, role });
  
  const { id } = await userModel.getUserByEmail(email);
  const token = jwt.sign({ id, role }, process.env.SECRET || '12345');

  return { ...created, name, role, email, token };
};

module.exports = registerServ;
