'use strict'

const User = require('./user.model');
const { encrypt } = require('../../utils/validate');


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