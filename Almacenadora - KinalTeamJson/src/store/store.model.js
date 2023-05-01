'use strict'

const mongoose = require('mongoose');

// nombre descripción ubicación tamaño disponibilidad precio

const storeScheme = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    availability:{
        type: Boolean,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
}, {versionKey: false});

module.exports = mongoose.model('Store', storeScheme);