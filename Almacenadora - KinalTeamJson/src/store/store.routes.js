'use strict'

const express = require('express');
const api = express.Router();
const storeController = require('./store.controller');
const { ensureAuth, isAdmin } = require('../../services/authenticated');

api.get('/', storeController.test);

//ADMIN
api.post('/add', [ensureAuth, isAdmin], storeController.add);
api.get('/get', [ensureAuth, isAdmin], storeController.get);
api.get('/get/:availability', [ensureAuth, isAdmin], storeController.getByAvailability);
api.put('/update/:id', [ensureAuth, isAdmin], storeController.update);

module.exports = api;