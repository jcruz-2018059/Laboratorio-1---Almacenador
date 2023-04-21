'use strict'

const additionalServieController = require('./additionalServices.controller');
const express = require('express');
const api = express.Router();

api.get('/', additionalServieController.test);

module.exports = api;