import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Entry from './containers/Entry';
import Page from './containers/Page';


const routes = 
  <Router history={browserHistory}>
    <Route path="/admin" component={Entry}>
      <Route path="/admin/pages/:pageId" component={Page} />
    </Route>    
  </Router>

export default routes;
