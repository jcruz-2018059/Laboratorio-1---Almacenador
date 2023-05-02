'use strict'

const express = require('express');
const api = express.Router();
const clientController = require('../client/client.controller');
const { ensureAuth, isAdmin } = require('../../services/authenticated');

api.post('/add', ensureAuth, clientController.addClient);
api.get('/get/:id', ensureAuth, clientController.getClient);
api.get('/get', ensureAuth, clientController.getClients);
api.put('/update/:id', ensureAuth, clientController.updateClient);
api.delete('/delete/:id', ensureAuth, clientController.deleteClient)

module.exports = api;