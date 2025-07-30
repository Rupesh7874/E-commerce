const express = require('express');
const routs = express.Router();
const { login } = require('../controllers/user.controller');



routs.post('/login', login);


module.exports = routs; 