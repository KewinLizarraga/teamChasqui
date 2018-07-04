import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import Root from './views/Root/Root';
import './assets/scss/material-kit-react.css';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(reduxThunk));

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
