'use strict'

const leaseController = require('./lease.controller');
const express = require('express');
const api = express.Router();
 
api.get('/', leaseController.test);
api.put('/addLease', leaseController.addLease);
api.get('/getDisabled', leaseController.getStoreDisabled);

module.exports = api;