const express = require('express');
const apiV1routs = express.Router();
const userRouts = require('../routs/user.routs');
const productRouts = require('../routs/product.routs');
const categoryRouts = require('../routs/category.routs');

apiV1routs.use('/user', userRouts)
apiV1routs.use('/product', productRouts)
apiV1routs.use('/category', categoryRouts)

    
module.exports = apiV1routs;