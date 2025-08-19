const express = require('express');
const routs = express.Router();
const subcategorycontroller = require('../controllers/subcategory.controller')

routs.post('/addsubcategory',subcategorycontroller.addsubcategory);
routs.get('/getallsubcategory',subcategorycontroller.getallsubcategory);


module.exports = routs;