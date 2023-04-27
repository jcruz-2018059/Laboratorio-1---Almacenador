'use strict'

const leaseController = require('./lease.controller');
const express = require('express');
const api = express.Router();
 
api.get('/', leaseController.test);

module.exports = api;