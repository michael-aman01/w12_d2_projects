import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store';
import  { csrfFetch, restoreCSRF } from './store/csrf'


const Store = configureStore()

if (process.env.NODE_ENV !== 'production') {
  window.store = Store;
  window.csrfFetch = csrfFetch;
}

const renderApplication = () => {
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
}

if(sessionStorage.getItem('X-CSRF-Token')){
  renderApplication()
}else{
  restoreCSRF().then(renderApplication)
}

