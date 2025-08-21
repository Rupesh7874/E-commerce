const mongoose = require('mongoose');


const productschema = mongoose.Schema({
    // productname, price, description, discountPrice, productimage, category
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    discountPrice: {
        type: String,
        // required: true
        default: ""
    },
    productimage: {
        type: String,
        // required:true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcategory"
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const product = mongoose.model('product', productschema);

module.exports = product;