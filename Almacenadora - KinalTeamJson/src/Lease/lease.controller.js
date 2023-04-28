'use strcit'

const Lease = require('./lease.model');
const Store = require('../store/store.model');
const Client = require('../client/client.model');
const AdditionalServices = require('../AdditionalServices/additionalServices.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is Running'});
}

exports.getStoreDisabled = async(req, res)=>{
    try{
        let leaseDisabled = await Lease.find({});
        if(!leaseDisabled) return res.status(500).send({message: 'Lease not found'});
        return res.send({leaseDisabled});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Store Disabled', error: err.message});
    }
}

exports.addLease = async(req, res)=>{
    try{
        let data = req.body;
        let store = await Store.find({_id: data.store}).populate('Store');
        let client = await Client.find({_id: data.client}).populate('Client');
        let additionalServices = await AdditionalServices.find({_id: data.additionalServices}).populate('AdditionalServices');
        if(!store && !client && !additionalServices) return res.status(404).send({message: 'Store,Client and Additional Services not found'});


        let updatadeAvailability = await Store.findOneAndUpdate(
            {_id: data.store},
            {availability:  false},
            {new: true}
        )
        if(!updatadeAvailability) return res.status(404).send({message: 'Store Can not be updated'});
        let lease = new Lease(data);
        await lease.save();
        return res.send({message: 'Availability store is update', lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a Lease', error: err.message});
    }
}


exports.addAdditionalServices = async(req,res)=>{
    try{
        let data
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding additional services'});
    }
}