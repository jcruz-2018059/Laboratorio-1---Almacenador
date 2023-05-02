'use strict'

const leaseController = require('./lease.controller');
const express = require('express');
const api = express.Router();
const { ensureAuth, isAdmin } = require('../../services/authenticated');
 
api.get('/',  leaseController.test);
api.put('/addLease', leaseController.addLease);
api.get('/getDisabled', leaseController.getStoreDisabled);
api.get('/getleases', ensureAuth, leaseController.getLeases);
api.delete('/deleteLease/:id', ensureAuth, leaseController.deleteLease);
api.put('/updateLease/:id', leaseController.updateLease);
api.put('/addService/:id', ensureAuth, leaseController.addAdditionalServices);

module.exports = api;