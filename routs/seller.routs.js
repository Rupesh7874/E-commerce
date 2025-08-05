const express = require('express');
const routs = express.Router();
const { addproduct } = require('../controllers/seller.controller');
const multer = require('multer');

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


routs.post('/addproduct', upload.single('productimage'), addproduct);


module.exports = routs;