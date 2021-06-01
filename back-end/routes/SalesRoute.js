const routes = require('express').Router();
const { salesCtrl } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

routes.get('/', authMiddleware, salesCtrl.getAll);
routes.get('/:id', authMiddleware, salesCtrl.getById);
routes.put('/:id', authMiddleware, salesCtrl.updateStatus);

module.exports = routes;