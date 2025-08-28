const express = require('express');
const routs = express.Router();
const productcontroller = require('../controllers/product.controller');
const multer = require('multer');
const Verifytoken = require('../confige/auth');

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


routs.post('/addproduct', upload.single('productimage'), productcontroller.addproduct);
routs.delete('/deleteproduct', productcontroller.deleteproduct);
routs.put('/updateproduct', upload.single('productimage'), productcontroller.updateproduct);
routs.get('/getallproduct',Verifytoken, productcontroller.getallproduct);

module.exports = routs;