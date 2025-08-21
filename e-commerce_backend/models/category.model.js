const express = require('express');
const { ServerDescription, Timestamp } = require('mongodb');
const { default: mongoose } = require('mongoose');




const categoryschema = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryimage: {
        type: String,
        // required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const category = mongoose.model('category', categoryschema);

module.exports = category;