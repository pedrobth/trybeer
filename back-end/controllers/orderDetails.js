const { Router } = require('express');
const { orderDetails } = require('../services');

const orderDetailsRoute = Router();

orderDetailsRoute.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await orderDetails(id);
        if (result.err) return next(result);
        const { status, error, message } = result;
        res.status(status).json({ message, error } || {});
    } catch (err) {
        console.log(err);
        return next({ err, status: 'internal server error' });
    }
});

module.exports = orderDetailsRoute;