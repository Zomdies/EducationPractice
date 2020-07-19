import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store'


import './index.css';

import App from './App'



ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App ></App>
    </Provider>
  </Router>,
  document.getElementById('root')
);

