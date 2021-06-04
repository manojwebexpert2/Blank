import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createReduxStore} from './redux';  //this is a function


import App from './App';


import './styles.css';

const rootElement = document.getElementById('root');
ReactDOM.render(<Provider store={createReduxStore()}><App /></Provider>,rootElement);
