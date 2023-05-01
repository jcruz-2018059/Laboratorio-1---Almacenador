'use strict'

const User = require('./user.model');
const { encrypt, validateData, checkPassword } = require('../../utils/validate');
const { createToken } = require('../../services/jwt');

exports.test = (req, res)=>{
    return res.send({message: 'Test function is running :)'});
}

exports.default = async()=>{
    try{
        let defAdmin = {
            name: 'General',
            surname: 'Administrator',
            username: 'admin',
            password: 'admin',
            email: 'admin@storage.gt',
            phone: '+502 5984 2658',
            role: 'ADMIN'
        }
        let existAdministrator = await User.findOne({username: 'admin'});
        if(existAdministrator){
            return console.log('Default admin is already created.');
        }
        defAdmin.password = await encrypt(defAdmin.password);
        let createDefaultAdmin = new User(defAdmin);
        await createDefaultAdmin.save();
        return console.log('Default administrator created.');
    }catch(err){
        console.error(err);
    }
}

exports.login = async(req, res)=>{
    try{
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let validate = validateData(credentials);
        if(validate){
            return res.status(400).send({validate});
        }
        let user = await User.findOne({username: data.username})
        console.log(user.role);
        if(user.role !== 'ADMIN' ){
            return res.status(400).send({message: `You don't have this permission`});
        }
        if(user && await checkPassword(data.password, user.password)){
            let token = await createToken(user);
            return res.send({message: 'User logged sucessfully.', token});
        }
        return res.status(404).send({message: 'Invalid credentials.'})

    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error logging'});
    }
}

exports.create = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone
        } 
        let validate = validateData(params);
        if(validate){
            return res.status(400).send({validate});
        }
        let existUsername = await User.findOne({username: data.username});
        if(existUsername){
            return res.status(400).send({message: 'Username already exists'});
        }
        data.role = 'WORKER'
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'User created sucessfully', user});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating user'});
    }
}

exports.getUsers = async(req, res)=>{
    try{
        let users = await User.find().select('name surname username email phone');
        return res.send({message: 'Users found: ', users});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting users'});
    }
}

exports.getUser = async(req, res)=>{
    try{
        let userId = req.params.id;
        let user = await User.findOne({_id: userId}).select('name surname username email phone');
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }
        return res.send({message: 'User found: ', user});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting user'});
    }
}

exports.update = async(req, res)=>{
    try{
        let data = req.body;
        let userId = req.params.id;
        let existUser = await User.findOne({_id: userId});
        if(!existUser){
            return res.status(404).send({message: 'User not found'});
        }
        if(data.password || Object.entries(data).length === 0 || data.role){
            return res.status(400).send({message: 'Data cannot be updated'});
        }
        if(data.username){
            let existUsername = await User.findOne({username: data.username});
            if(existUsername._id != userId){
                return res.status(400).send({message: 'Username already exists'});
            }
        }
        let updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            data,
            {new: true}
        );
        if(!updatedUser){
            return res.status(404).send({message: 'User not found and not updated'});
        }
        return res.send({message: 'User updated: ', updatedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating user'});
    }
}

//something new
exports.delete = async(req, res)=>{
    try{
        let userId = req.params.id;
        let user = await User.findOne({_id: userId});
        if(user.username === 'admin'){
            return res.status(401).send({message: 'Not authorized'});
        }
        let deletedUser = await User.findOneAndDelete({_id: userId});
        if(!deletedUser){
            return res.status(404).send({message:'User not found and not deleted'});
        }
        return res.send({message: 'User deleted sucessfully', deletedUser});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting user'});
    }
}