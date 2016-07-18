const express = require('express');
const bodyParser = require('body-parser');
const returnsControllers = require('./controllers');
const queries = require('../../db/queries');

const apiRouter = express.Router();
module.exports = apiRouter;

const controllers = returnsControllers(queries);

apiRouter.use(bodyParser.json());

apiRouter.get('/test', controllers.test);
