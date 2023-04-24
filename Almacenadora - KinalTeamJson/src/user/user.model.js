'use strict'

const mongoose = require('mongoose');

// nombre apellido username password email teléfono rol

const userScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        uppercase: true,
        default: 'WORKER'
    }
}, {versionKey: false});

module.exports = mongoose.model('User', userScheme);
