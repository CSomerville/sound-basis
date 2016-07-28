import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './store';
import '../shared/styles/main.scss';

const app = document.getElementById('app');

render(
  <Provider store={store}>
    {routes}
  </Provider>
  , app); 

