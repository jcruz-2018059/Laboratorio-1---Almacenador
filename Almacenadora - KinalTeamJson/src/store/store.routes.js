'use strict'

const express = require('express');
const api = express.Router();
const storeController = require('./store.controller');
const { ensureAuth, isAdmin } = require('../../services/authenticated');

api.get('/', storeController.test);

api.post('/add', [ensureAuth, isAdmin], storeController.add);

module.exports = api;