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