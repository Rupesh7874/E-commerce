const mongoose=require('mongoose');

const subcategoryschema = mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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