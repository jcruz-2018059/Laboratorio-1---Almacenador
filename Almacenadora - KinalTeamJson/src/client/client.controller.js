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
        let categories = Client.find()
        return res.send({categories});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error server, clients not found'})
    }
}

/*exports.updateClient = async(req, res)=>{
    try{
        let clientId = req.params.id;
        let data = req.body;
        let existClient = Client.findOne({_id: clientId})
        if(existClient){
            if(data.dpi !=)
        }
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error server, Client not updated'})
    }
}*/