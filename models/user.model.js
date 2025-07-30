const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    otp: {
        type: String
    },
    password: {
        type: String,
        default: ""
    },
    age: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    },
    expiration_Time: {
        type: Date,
       default: ""
    },
    userimage: {
        type: String,
        default: ""
    }
}, { Timestamp: true })

const User = mongoose.model('user', userschema);

module.exports = User