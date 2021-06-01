const { Router } = require('express');
const { allOrders } = require('../services');

const allOrdersRoute = Router();

allOrdersRoute.get('/', async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await allOrders(id);
        if (result.err) return next(result);
        const { status, error, message } = result;
        res.status(status).json({ message, error } || {});
    } catch (err) {
        console.log(err);
        return next({ err, status: 'internal server error' });
    }
});

module.exports = allOrdersRoute;