import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import { store } from './store'
import App from './components/App';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
