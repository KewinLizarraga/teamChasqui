import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css'
import './index.css'

import Chasqui from './components/'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chasqui/> , document.getElementById('root'));
registerServiceWorker();
