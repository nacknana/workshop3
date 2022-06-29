import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './NShop/saga/configureStore'
import axios from 'axios'

const { store, persistor } = configureStore()


axios.defaults.baseURL = 'http://127.0.0.1:8000'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>

    </BrowserRouter>
);
reportWebVitals();
