const express = require('express');
const { ServerDescription, Timestamp } = require('mongodb');
const { default: mongoose } = require('mongoose');




const categoryschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryimage: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true
    },
}, { Timestamp: true });

const category = mongoose.model('category', categoryschema);

module.exports = category;