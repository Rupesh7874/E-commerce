const express = require('express');
const apiV1routs = express.Router();
const userRouts = require('../routs/user.routs');
const productRouts = require('../routs/product.routs');
const categoryRouts = require('../routs/category.routs');
const subcategoryRouts = require('../routs/subcategory.routs');
const cartRouts = require('../routs/addtocart');

apiV1routs.use('/user', userRouts);
apiV1routs.use('/category', categoryRouts);
apiV1routs.use('/subcategory', subcategoryRouts);
apiV1routs.use('/product', productRouts);
apiV1routs.use('/cart', cartRouts);



module.exports = apiV1routs;