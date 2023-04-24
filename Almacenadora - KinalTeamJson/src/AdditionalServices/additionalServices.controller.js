'use strict'

const AdditionalServies = require('./additionalServices.model');

exports.test = (req, res)=>{
    res.send({message: 'Test fuction is running'});
}

exports.addAdditionalServices = async(req, res)=>{
    try{
        let data = req.body;
        let additionalService = new AdditionalServies(data);
        await additionalService.save();
        return res.send({message: 'Service created successfully', additionalService});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error crea'})
    }
}