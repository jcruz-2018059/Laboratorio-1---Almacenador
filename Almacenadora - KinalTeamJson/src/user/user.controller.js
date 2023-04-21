'use strict'

const User = require('./user.model');


exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}