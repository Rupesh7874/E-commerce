const express = require('express');
const apiV1routs = express.Router();
const userRouts = require('../routs/user.routs');


apiV1routs.use('/user', userRouts)


module.exports = apiV1routs;