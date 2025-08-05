const express = require('express');
const apiV1routs = express.Router();
const userRouts = require('../routs/user.routs');
const productRouts = require('../routs/product.routs');

apiV1routs.use('/user', userRouts)
apiV1routs.use('/product', productRouts)

    
module.exports = apiV1routs;