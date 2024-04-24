import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store/store';

import App from './components/app/App';

import './style/style.scss';

const Root = () => <Router><App /></Router>;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Root/>
    </Provider>
);
