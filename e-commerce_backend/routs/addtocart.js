const express = require('express');
const routs = express.Router();
const addtocartcontroller = require('../controllers/addtocart.controller');
const Verifytoken = require('../confige/auth');


routs.post('/addaddcart', Verifytoken, addtocartcontroller.addaddcart);
routs.delete('/deleteaddcart', Verifytoken, addtocartcontroller.deleteaddcart);
routs.get('/getusercart', Verifytoken, addtocartcontroller.getusercart);

module.exports = routs;