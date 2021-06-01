const express = require('express');
const rescue = require('express-rescue');

const { registerCtrl } = require('../controllers');
const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.post('/', checkUser, rescue(registerCtrl));

module.exports = router;
