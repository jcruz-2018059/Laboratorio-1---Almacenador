'use strcit'

const Lease = require('./lease.model');
const Store = require('../store/store.model');
const Client = require('../client/client.model');
const AdditionalServices = require('../AdditionalServices/additionalServices.model');
const { validateData } = require('../../utils/validate');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is Running'});
}

exports.getStoreDisabled = async(req, res)=>{
    try{
        let leaseDisabled = await Lease.find({}).populate('client');
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
        //ID
        let store = await Store.findOne({_id: data.store});
        let client = await Client.find({_id: data.client});
        let additionalServices = await AdditionalServices.findOne({_id: data.additionalServices});
        //Price
        let storePrice = store.price;
        let servicesPrice = additionalServices.price;
        console.log(servicesPrice);
        let subtotal = storePrice + servicesPrice;

        //Params
        let params = {
            date: data.date,
            client: data.client,
            store: data.store,
            additionalServices: data.additionalServices,
            total: subtotal
        }

        if(!store && !client && !additionalServices) return res.status(404).send({message: 'Store,Client and Additional Services not found'});
        if(store.availability == false) return res.send({message: 'The warehouse is disabled'});

        let updatadeAvailability = await Store.findOneAndUpdate(
            {_id: data.store},
            {availability:  false},
            {new: true}
        )
        if(!updatadeAvailability) return res.status(404).send({message: 'Store Can not be updated'});
        let lease = new Lease(params);
        await lease.save();
        return res.send({message: 'Availability store is update', lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a Lease', error: err.message});
    }
}


exports.addAdditionalServices = async(req,res)=>{
    try{
        let data = req.body; 
        let serviceID = req.params.id;
        let validate = validateData();

        let existService = await AdditionalServices.findOne({_id: serviceID});
        if(!existService) return res.status(404).send({message: 'Additional Service not found'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding additional services'});
    }
}