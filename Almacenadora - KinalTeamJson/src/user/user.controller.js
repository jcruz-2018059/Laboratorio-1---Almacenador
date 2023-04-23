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
            return res.status(400).send({message: 'username already exists'});
        }
        data.role = 'WORKER'
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'User created sucessfully', user});
    }catch(err){
        console.error(err);
    }
}