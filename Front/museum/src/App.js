import React from 'react';


import MainScreen from './Pages/MainScreen'
import AdminPanel from './Pages/AdminPanel'
import { Router, Switch, Redirect, Route } from 'react-router'
import { createBrowserHistory } from 'history'

import logo from './logo.svg';
import './App.css';

const history = createBrowserHistory()

const App = () => {
  return (
    <React.StrictMode >
      <Router history={history}>
        <Switch>
          <Route history={history} path='/home' component={MainScreen} />
          <Route history={history} path='/admin' component={AdminPanel} />
          <Redirect from='/' to='/home' />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
