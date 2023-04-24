'use strict'

const { find } = require('./additionalServices.model');
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
        return res.status(500).send({message: 'Error creating Additional Services', error: err.message});
    }
}

exports.getAdditionalServices = async(req,res)=>{
    try{
        let addAdditionalServices = await AdditionalServies.find();
        return res.send({addAdditionalServices});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Additional Services'});
    }
}

exports.updateAdditionalServices = async(req,res)=>{
    try{
        let data = req.body;
        let serviceId = req.params.id;
        let updateService = await AdditionalServies.findOneAndUpdate(
            {_id: serviceId},
            data,
            {name: true}
        )
        if(!updateService) return res.status(404).send({message: 'Error updating Additional Services'});
        return res.send({updateService});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating Additional Services', error:err.message});
    }
}