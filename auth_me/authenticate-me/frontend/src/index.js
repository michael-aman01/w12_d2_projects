import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store';

const Store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = Store;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
