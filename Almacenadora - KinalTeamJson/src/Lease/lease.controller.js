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
        let leaseDisabled = await Lease.find({}).
                                                populate('client').
                                                populate('store');
        if(!leaseDisabled) return res.status(500).send({message: 'Lease not found'});
        return res.send({leaseDisabled});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Store Disabled', error: err.message});
    }
}


exports.getLeases = async(req, res)=>{
    try{
        let leases = await Lease.find({}).populate('client').populate('store')
        if(!leases) return res.send({message: 'Leases not found'})
        return res.send({message: 'Leases Found', leases})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not found leases', error: err.message});
    }
} 

exports.addLease = async(req, res)=>{
    try{
        let data = req.body;
        //ID
        let store = await Store.findOne({_id: data.store});
        let client = await Client.findOne({_id: data.client});
        let additionalServices = await AdditionalServices.findOne({_id: data.additionalServices});
        //Price
        let storePrice = store.price;
        let servicesPrice = additionalServices.price;
        console.log(servicesPrice);
        let subtotal = storePrice + servicesPrice;

        //Params
        let service = {
            id: additionalServices._id,
            name: additionalServices.name,
            description: additionalServices.description,
            price: additionalServices.price
        }

        let params = {
            date: data.date,
            client: data.client,
            store: data.store,
            additionalServices: service,
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
        return res.send({message: 'Availability store is Created', lease});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding a Lease', error: err.message});
    }
}


exports.addAdditionalServices = async(req,res)=>{
    try{
        let data = req.body; 
        let leaseID = req.params.id;

        let existLease = await Lease.findOne({_id: leaseID});
        if(!existLease) return  res.status(404).send({message: 'Lease not found'});
        let existService = await AdditionalServices.findOne({_id: data.additionalService});
        if(!existService) return res.status(404).send({message: 'Additional Service not found'});

        let seletcService = {
            id: existService._id,
            name: existService.name,
            description: existService.description,
            price: existService.price,
        }
        total = existLease.total + seletcService.price;
        let updateServiceLease = await Lease.findOneAndUpdate(
            {_id: leaseID},
            {$push : {additionalServices: seletcService}, total: total},
            {new: true}
        )
        return res.send({message: 'Additional Service add Successfullly', updateServiceLease})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding additional services', error: err.message});
    }
}

/*exports.updateLease = async(req,res)=>{
    try{
        let data = req.body;
        let leaseID = req.params.id;

        let store = await Lease.findOne({_id: leaseID});
        let stores = await Store.findOne({_id: store.store})
        
        let updateStoreBefore = await Store.findOneAndUpdate(
            {_id: store.store._id},
            {availability: true},
            {new: true}   
        )
        if(!updateStoreBefore) return res.status(404).send({message: 'Store  not found not update'});

        let updateLease = await Lease.findOneAndUpdate(
            {_id: leaseID},
            data,
            {new: true}
        )
        if(!updateLease) return res.status(404).send({message: 'Lease not found not Updated'});

        let updateStoreAfter = await Store.findOneAndUpdate(
            {_id: data.store},
            {availability: false},
            {new: true},
        )
        if(!updateStoreAfter) return res.status(404).send({message: 'Store not found not updated'});

            let basePrice = updateLease.total;
            let priceBefore = store.price         
            let newStorePrice = await Store.findOne({_id: data.store}, {price: 1});
            let totalPrice = basePrice - priceBefore;
            let definitivePrice = totalPrice + newStorePrice
            updateLease.total = definitivePrice;
            await updateLease.save();

            return res.send({updateLease, updateStoreAfter, updateStoreBefore});

       
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error Updating Lease', error: err.message});
    }
}*/

exports.updateLease = async(req,res)=>{
    try{
        //ID
        let data = req.body;
        let leaseID = req.params.id;
        let lease = await Lease.findOne({_id: leaseID});
        if(!lease) return res.status(404).send({message:'Lease not found'});
        let storeBefore = await Store.findOne({_id: lease.store});
        let newStore = await Store.findOne({_id: data.store});

        //datos de total
        let leaseTotalBefore = lease.total;
        let storePriceBefore = storeBefore.price;
        let newStorePrice = newStore.price;

        let subtotal = leaseTotalBefore - storePriceBefore;
        let newTotal = subtotal + newStorePrice;



        let updateStoreBefore = await Store.findOneAndUpdate(
            {_id: storeBefore._id},
            {availability: true},
            {new: true}
        )
        if(!updateStoreBefore) return res.status(404).send({message: 'Store  not found not update'});

        let params =  {
            store: newStore,
            total: newTotal
        }

        let updateLease = await Lease.findOneAndUpdate(
            {_id: leaseID},
            params,
            {new: true}
        ).populate('store').populate('client')
        if(!updateLease) return res.status(404).send({message: 'Lease not found not Updated'});

        let updateStoreAfter = await Store.findOneAndUpdate(
            {_id: data.store},
            {availability: false},
            {new: true},
        )
        if(!updateStoreAfter) return res.status(404).send({message: 'Store not found not updated'});

        return res.send({updateLease, updateStoreAfter, updateStoreBefore});


    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error Updating Lease', error: err.message});
    }
}

exports.deleteLease = async(req,res)=>{
    try{
        let leaseID = req.params.id;

        let store = await Lease.findOne({_id: leaseID})

        let storeUpdate = await Store.findOneAndUpdate(
            {_id: store.store._id},
            {availability: true},
            {new: true}
        )
        if(!storeUpdate) return res.status(404).send({message: 'Store not found, not updated'});

        let deleteLease = await Lease.findOneAndRemove({_id: leaseID});
        if(!deleteLease) return  res.status(404).send({message: 'Lease not found not deleted'});

        return res.send({deleteLease, storeUpdate});

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error delete '})
    }
}
