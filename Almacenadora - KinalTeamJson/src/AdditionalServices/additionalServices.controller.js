'use strict'

const AdditionalSevie = require('./additionalServices.model');

exports.test = (req, res)=>{
    res.send({message: 'Test fuction is running'});
}

exports.addAdditionalServices = async(req, res)=>{
    try{

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error crea'})
    }
}