const { Router } = require('express');
const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const { updateUser } = require('../controllers');

const updateUserRoute = Router();

updateUserRoute.put('/', auth, validateName, updateUser);

module.exports = updateUserRoute;