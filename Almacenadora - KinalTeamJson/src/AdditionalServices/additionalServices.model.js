'use strict'

const mongoose = require('mongoose');

const additionalServiceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('AdditionalService', additionalServiceSchema);