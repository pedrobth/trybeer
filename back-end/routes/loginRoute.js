const { Router } = require('express');

const { loginCtrl } = require('../controllers');

const loginRoute = Router();

loginRoute.post('/', loginCtrl);

module.exports = loginRoute;