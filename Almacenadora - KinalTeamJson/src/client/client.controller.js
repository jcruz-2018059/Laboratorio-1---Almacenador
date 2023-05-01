'use strict'

const Client = require('./client.model');
const e = require('express');

exports.test = (req, res)=>{
    return res.send({message: 'Test funtion is running'});
}

exports.addClient = async(req, res)=>{
    try{
        let data = req.body;
        let client = await Client.findOne({dpi: data.dpi});
        if(client) return res.send({message: 'Client already create'})
        let newClient = new Client(data)
        await newClient.save();
        return res.status(201).send({message: 'Client created succesfully'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error server, error saving client'})
    }
};

exports.getClient = async(req, res)=>{
    try{
        let clientId = req.params.id;
        let client = await Client.findOne({_id:clientId});
        if(!client) return res.send({message: 'Client not found'})
        return res.send({message: 'Client found:', client})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error searching Client'})
    }
}

exports.getClients = async(req, res)=>{
    try{
        let categories = await Client.find()
        return res.send({categories});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error server, clients not found'})
    }
}

exports.updateClient = async(req, res)=>{
    try{
        let clientId = req.params.id;
        let data = req.body;
        let existClient = await Client.findOne({dpi: data.dpi})
        if(existClient){
            if(existClient._id != clientId) return res.send({message: 'DPI Client Already Exist'})
            let updateClient = await Client.findByIdAndUpdate(
                {_id: clientId},
                data,
                {new: true}
            );
            if(!updateClient) return res.status(404).send({message: 'Client not Found and not update'})
            return res.send({updateClient})
        }
        let updateClient = await Client.findByIdAndUpdate(
            {_id: clientId},
            data,
            {new: true}
        );
        if(!updateClient) return res.status(404).send({message: 'Client not Found and not update'})
        return res.send({message: 'Client Updated', updateClient})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error server, Client not updated'})
    }
}

