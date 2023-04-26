'use strcit'

const Lease = require('./lease.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is Running'});
}