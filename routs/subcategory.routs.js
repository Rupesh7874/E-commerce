const express = require('express');
const routs = express.Router();
const subcategorycontroller = require('../controllers/subcategory.controller')

routs.post('/addSubategory',subcategorycontroller.addSubategory);
routs.get('/getallSubcategory',subcategorycontroller.getallSubcategory);
routs.delete('/deleteSubcategorybyId',subcategorycontroller.deleteSubcategorybyId);
routs.put('/updateSubcategorybyId',subcategorycontroller.updateSubcategorybyId);
routs.patch('/isActivedeActive',subcategorycontroller.isActivedeActive)

module.exports = routs;