'use strict'

const additionalServieController = require('./additionalServices.controller');
const express = require('express');
const api = express.Router();

api.get('/', additionalServieController.test);
api.post('/addServices', additionalServieController.addAdditionalServices);
api.get('/getServices', additionalServieController.getAdditionalServices);

module.exports = api;