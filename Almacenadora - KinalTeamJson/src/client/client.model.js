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
},{
    versionKey: false
});

module.exports = mongoose.model('Client', userSchema);
