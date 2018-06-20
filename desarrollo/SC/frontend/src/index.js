import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Root from './components/Root/Root';
import './assets/scss/material-kit-react.css';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(reduxThunk, createLogger()));

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
