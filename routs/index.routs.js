const express = require('express');
const apiV1routs = express.Router();
const userRouts = require('../routs/user.routs');
const sellerRouts = require('../routs/seller.routs');

apiV1routs.use('/user', userRouts)
apiV1routs.use('/seller', sellerRouts)

    
module.exports = apiV1routs;