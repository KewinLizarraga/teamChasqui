import React from 'react';
import ReactDOM from 'react-dom';


import 'normalize.css'
import './index.css'

import Chasqui from './components/'
import Home from './components/pages/Home'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home/> , document.getElementById('root'));
registerServiceWorker();
