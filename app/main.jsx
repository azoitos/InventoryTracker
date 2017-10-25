'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store.jsx';
import Home from './components/Home.jsx'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Home />
        </Router>
    </Provider>,
    document.getElementById('main')
);
