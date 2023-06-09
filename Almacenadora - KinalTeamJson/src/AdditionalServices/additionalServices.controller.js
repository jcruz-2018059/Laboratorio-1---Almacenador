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

exports.getAdditionalService = async(req, res)=>{
    try{
        let additionalServiceId = req.params.id
        let addAdditionalService = await AdditionalServies.findOne({_id: additionalServiceId})
        if(!additionalServiceId) return res.status(404).send({message: 'Additionals service not found'})
        return res.send({addAdditionalService});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting Additional Service'});
    }
}

exports.updateAdditionalServices = async(req,res)=>{
    try{
        let data = req.body;
        let serviceId = req.params.id;
        let updateService = await AdditionalServies.findOneAndUpdate(
            {_id: serviceId},
            data,
            {new: true}
        )
        if(!updateService) return res.status(404).send({message: 'Error updating Additional Services'});
        return res.send({message:'Service Updated', updateService});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating Additional Services', error:err.message});
    }
}