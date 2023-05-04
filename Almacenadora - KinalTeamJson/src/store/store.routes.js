'use strict'

const express = require('express');
const api = express.Router();
const storeController = require('./store.controller');
const { ensureAuth, isAdmin } = require('../../services/authenticated');

api.get('/', storeController.test);

//ADMIN
api.post('/add', [ensureAuth, isAdmin], storeController.add);
api.get('/get', ensureAuth, storeController.get);
api.get('/getByName/:name', ensureAuth, storeController.getStoreByName)
api.get('/get/:id', [ensureAuth, isAdmin], storeController.getStore);
api.get('/get/:availability', [ensureAuth, isAdmin], storeController.getByAvailability);
api.put('/update/:id', [ensureAuth, isAdmin], storeController.update);
api.delete('/delete/:id', [ensureAuth, isAdmin], storeController.delete);

module.exports = api;