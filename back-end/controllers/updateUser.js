const { Router } = require('express');
const { updateUser } = require('../services');

const updateUserRoute = Router();

updateUserRoute.put('/', async (req, res, next) => {
    try {
        const { id } = req.user;
        const { name } = req.body;
        const result = await updateUser(id, name);
        if (result.err) return next(result);
        const { status, error, message } = result;
        res.status(status).json({ message, error } || {});
    } catch (err) {
        console.log(err);
        return next({ err, status: 'internal server error' });
    }
});

module.exports = updateUserRoute;