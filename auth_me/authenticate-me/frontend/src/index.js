import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/index';
import  { csrfFetch, restoreCSRF } from './store/csrf'
import * as sessionActions from './store/session'


const initialState = {
  session: {currentUser: null}
}
const Store = configureStore(initialState)


if (process.env.NODE_ENV !== 'production') {
  window.store = Store;
  window.csrfFetch = csrfFetch;
  window.restoreCSRF = restoreCSRF;
  window.sessionActions = sessionActions;
}

const renderApplication = () => {
  return  ReactDOM.render(
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

