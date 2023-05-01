'use strict'

const { validateData } = require('../../utils/validate');
const Store = require('./store.model');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

exports.add = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name,
            description: data.description,
            location: data.location,
            size: data.size,
            availability: data.availability,
            price: data.price
        }
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        let existStore = await Store.findOne({name: data.name});
        if(existStore){
            return res.status(400).send({message: 'store already exists'});
        }
        let store = new Store(data);
        await store.save();
        return res.send({message: 'Store created sucessfully: ', store});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding store'});
    }
}

exports.get = async(req, res)=>{
    try{
        let stores = await Store.find();
        return res.send({message: 'Stores found: ', stores});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting store'});
    }
}

exports.getStore = async(req, res)=>{
    try {
          let storeid = req.params.id;
          let store = await Store.findOne({_id:storeid});
          if(!store) return res.send({message: 'Store not found'});
          return res.send({store})   
    } catch (error) {
        console.error(err);
        return res.status(500).send({message: 'Error getting store'});
    }

}

exports.getByAvailability = async(req, res)=>{
    try{
        let availabilityValue = req.params.availability;
        let stores = await Store.find({availability: availabilityValue});
        return res.send({message: 'Stores found: ', stores});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting store'});
    }
}

exports.update = async(req, res)=>{
    try{
        let data = req.body;
        let storeId = req.params.id;
        let existStore = await Store.findOne({_id: storeId});
        if(!existStore){
            return res.status(404).send({message: 'Store not found'});
        }
        if(Object.entries(data).length === 0){
            return res.status(400).send({message: 'Data cannot be updated'});
        }
        if(data.name){
            let existStore = await Store.findOne({name: data.name});
            if(existStore){
                return res.status(400).send({message: 'Store already exists'});
            }
        }
        let updatedStore = await Store.findOneAndUpdate(
            {_id: storeId},
            data,
            {new: true}
        );
        if(!updatedStore){
            return res.status(404).send({message: 'Store not found and not updated'});
        }
        return res.send({message: 'Store updated: ', updatedStore});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating store'});
    }
}

exports.delete = async(req, res)=>{
    try{
        let storeId = req.params.id;
        let deletedStore = await Store.findOneAndDelete({_id: storeId});
        if(!deletedStore){
            return res.status(404).send({message:'Store not found and not deleted'});
        }
        return res.send({message: 'Store deleted sucessfully', deletedStore});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting store'});
    }
}