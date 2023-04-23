'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin } = require('../../services/authenticated');

api.get('/', userController.test);
api.post('/login', userController.login);

//ADMIN
api.post('/create', [ensureAuth, isAdmin], userController.create);

module.exports = api;