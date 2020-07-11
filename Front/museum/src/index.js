import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import MainScreen from './Pages/MainScreen'
import AdminPanel from './Pages/AdminPanel'
import {Router, Switch, Redirect, Route} from 'react-router'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode >
    <Router history={history}>
      <Switch>
        <Route history={history} path='/home' component={MainScreen}/>
        <Route history={history} path='/admin' component={AdminPanel}/>
        <Redirect from='/' to='/home'/>        
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
