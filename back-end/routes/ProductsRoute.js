const routes = require('express').Router();
const { productCtrl } = require('../controllers');

routes.get('/', productCtrl.getProducts);

module.exports = routes;
