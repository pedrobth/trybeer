const { salesService } = require('../services');
const { permissionDenied } = require('../services/dictionaries/statusMsgMap');

const internal = 'internal server error';

const getAll = async (req, res, next) => {
  try {
    if (req.user.role !== 'administrator') {
      const { status, ...rest } = permissionDenied;
      return res.status(status).json(rest);
    }
    const result = await salesService.getAll();
    if (result.err) return next(result);
    const { status, sales } = result;
    return res.status(status).json(sales);
  } catch (err) {
    console.log(err);
    return next({ err, status: internal });
  }
};

const getById = async (req, res, next) => {
  try {
    if (req.user.role !== 'administrator') {
      const { status, ...rest } = permissionDenied;
      return res.status(status).json(rest);
    }
    const { id } = req.params;
    const result = await salesService.getById(id);
    if (result.err) return next(result);
    const { status, sale } = result;
    return res.status(status).json(sale);
  } catch (err) {
    console.log(err);
    return next({ err, status: internal });
  }
};

const updateStatus = async (req, res, next) => {
  try {
    if (req.user.role !== 'administrator') {
      const { status, ...rest } = permissionDenied;
      return res.status(status).json(rest);
    }
    const { id } = req.params;
    const result = await salesService.updateStatus(id);
    if (result.err) return next(result);
    const { status, ...rest } = result;
    return res.status(status).json({ ...rest });
  } catch (err) {
    console.log(err);
    return next({ err, status: internal });
  }
};

module.exports = { getAll, getById, updateStatus };
