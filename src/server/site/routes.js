const express = require('express');
const controllers = require('./controllers');

const siteRouter = express.Router();
module.exports = siteRouter;

siteRouter.get('/', controllers.publicIndex);
siteRouter.get('/admin', controllers.adminIndex);
