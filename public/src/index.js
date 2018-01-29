require('babel-polyfill');
import thunkMiddleware from 'redux-thunk';
import {
  createLogger
} from 'redux-logger';

import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';

import {
  persistStore,
  persistReducer
} from 'redux-persist';

import storage from 'redux-persist/es/storage';
import reducer from './reducers';
import {
  PersistGate
} from 'redux-persist/es/integration/react';

import {
  Provider
} from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';

import Router from './containers/Router';


const loggerMiddleware = createLogger({});
let middleware = [];

if (NODE_ENV == 'DEV') {
  middleware.push(thunkMiddleware, loggerMiddleware);
} else {
  middleware.push(thunkMiddleware);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = composeEnhancers(
  applyMiddleware(...middleware),
)(createStore);

const config = {
  key: 'root',
  storage,
  debug: true,
};

const combinedReducer = persistReducer(config, reducer);

const createAppStore = () => {
  let store = configureStore(combinedReducer);
  let persistor = persistStore(store);

  return {
    persistor,
    store
  };
};

const {
  persistor,
  store
} = createAppStore();


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  )
})
