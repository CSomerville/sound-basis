const express = require('express');
const bodyParser = require('body-parser');
const returnsControllers = require('./controllers');
const queries = require('../../db/queries');
const { isAuthenticatedAJAX } = require('../passport-config');

const apiRouter = express.Router();
module.exports = apiRouter;

const controllers = returnsControllers(queries);

apiRouter.use(bodyParser.json());
apiRouter.use(isAuthenticatedAJAX);

apiRouter.get('/pages', controllers.pagesIndex);

apiRouter.post('/pages', controllers.pagesCreate);
apiRouter.put('/pages/:id', controllers.pagesUpdate);
apiRouter.delete('/pages/:id', controllers.pagesDestroy);

apiRouter.post('/sub-pages', controllers.subPagesCreate);
apiRouter.put('/sub-pages/:id', controllers.subPagesUpdate);
apiRouter.delete('/sub-pages/:id', controllers.subPagesDestroy);

apiRouter.post('/items', controllers.itemsCreate);
apiRouter.put('/items/:id', controllers.itemsUpdate);
apiRouter.delete('/items/:id', controllers.itemsDestroy);

apiRouter.put('/pages-locked', controllers.pagesLockedUpdate);
apiRouter.delete('/pages-locked', controllers.pagesLockedDelete);
