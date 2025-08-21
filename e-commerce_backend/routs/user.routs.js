const express = require('express');
const routs = express.Router();
const { sendmail, verifyOTP, ragister, resendmail, login } = require('../controllers/user.controller');
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

routs.post('/sendmail', sendmail);
routs.post('/verifyOTP', verifyOTP);
routs.post('/ragister', upload.single('userimage'), ragister);
routs.post('/resendmail', resendmail);
routs.post('/login', login);

module.exports = routs; 