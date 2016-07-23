import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root';
import callApi from './utils/call-api';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    callApi
  )
);

export default store;
