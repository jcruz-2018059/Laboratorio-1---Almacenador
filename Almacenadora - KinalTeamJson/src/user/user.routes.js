'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');

api.get('/', userController.test);
api.post('/login', userController.login);

module.exports = api;