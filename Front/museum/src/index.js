import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router,Redirect  } from 'react-router-dom'

import './index.css';

import App from './App'




ReactDOM.render(
  <Router>
    <App ></App>
  </Router>,
  document.getElementById('root')
);

