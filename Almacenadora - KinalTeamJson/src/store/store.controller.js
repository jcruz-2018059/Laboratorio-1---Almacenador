'use strict'

const Store = require('./store.model');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}