'use strict'

const mongoose = require('mongoose');

const leaseSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: true,
        unique: true
    },
    store:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Store',
        required: true,
    },
    additionalServices:{
        type: Array,
        default: []
    },
    total:{
        type: Number,
        requierd: true
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('Lease', leaseSchema);