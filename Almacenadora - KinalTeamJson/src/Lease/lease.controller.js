'use strcit'

const Lease = require('./lease.model');
const Store = require('../store/store.model');
const Client = require('../client/client.model');

exports.test = (req,res)=>{
    return res.send({message: 'Test function is Running'});
}

exports.getStoreDisabled = async(req, res)=>{
    try{
        
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Store Disabled'});
    }
}

exports.addClient = async(req, res)=>{
    try{
        let data = req.body;
        let store = await Store.find({_id: data.store});
        let client = await Client.find({_id: data.client});
        if(!store && !client) return res.status(404).send({message: 'Store and Cliend do not exist'});

        let lease = new Lease(data);
        await lease.save();

        let params = {
            availability:  false,
        }

        let updatadeAvailability = await Store.findOneAndUpdate(
            {_id: data.store},
            {$push : {store: params}},
            {new: true}
        )
        if(!updatadeAvailability) return res.status(404).send({message: 'Store Can not be updated'});
        return res.send({message: 'Availability store is update'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a Client'})
    }
}