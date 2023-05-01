'use strict'

const additionalServieController = require('./additionalServices.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin} = require('../../services/authenticated');

api.get('/', additionalServieController.test);
api.post('/addServices',[ensureAuth, isAdmin], additionalServieController.addAdditionalServices);
api.get('/getServices',[ensureAuth, isAdmin], additionalServieController.getAdditionalServices);
api.get('/getService/:id', [ensureAuth, isAdmin], additionalServieController.getAdditionalService);
api.put('/updateService/:id', [ensureAuth, isAdmin] ,additionalServieController.updateAdditionalServices);

module.exports = api;