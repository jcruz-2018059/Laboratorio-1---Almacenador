'use strict'

const additionalServieController = require('./additionalServices.controller');
const express = require('express');
const api = express.Router();
const {ensureAuth, isAdmin} = require('../../services/authenticated');

api.get('/', additionalServieController.test);
api.post('/addServices',ensureAuth, additionalServieController.addAdditionalServices);
api.get('/getServices',ensureAuth, additionalServieController.getAdditionalServices);
api.get('/getService/:id', ensureAuth, additionalServieController.getAdditionalService);
api.put('/updateService/:id', ensureAuth,additionalServieController.updateAdditionalServices);

module.exports = api;