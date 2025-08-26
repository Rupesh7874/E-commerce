const mongoose = require('mongoose');


const addtocartschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    }
})


const addtocartproduct = mongoose.model('addtocart', addtocartschema);

module.exports = addtocartproduct;