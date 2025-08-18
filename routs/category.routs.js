const express = require('express');
const routs = express.Router();
const multer = require('multer');
const categorycontroller = require('../controllers/category.controller');

//multer-code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + fileName + '.' + file.originalname.split('.').pop());
    }
})
const upload = multer({ storage: storage })

routs.post('/addcategory', upload.single('categoryimage'), categorycontroller.addcategory);
routs.get('/viewAllCategory', categorycontroller.viewAllCategory);
routs.put('/updatecategory', upload.single('categoryimage'), categorycontroller.updatecategory)
routs.patch('/isactivedeactive', categorycontroller.isactivedeactive);
routs.delete('/deletecategory', categorycontroller.deletecategory)

module.exports = routs;