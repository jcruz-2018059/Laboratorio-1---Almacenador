'use state'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    dpi: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
