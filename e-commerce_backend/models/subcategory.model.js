const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    // subcategoryimage: {
    //     type: String,
    //     // required: true
    // },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const subcategory = mongoose.model('subcategory', subcategoryschema);

module.exports = subcategory;