const mongoose = require('mongoose');


const userschema = mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: String,
        // required: true
    },
    otp: {
        type: String
    },
    password: {
        type: String,
        // required: true
    },
    age: {
        type: String,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    userimage: {
        type: String
    }
})

const User = mongoose.model('user', userschema);

module.exports = User