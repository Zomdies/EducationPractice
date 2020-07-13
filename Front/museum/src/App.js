import React, { useState, useEffect } from 'react';


import MainScreen from './Pages/MainScreen'
import AdminPanel from './Pages/AdminPanel'
import LoginPage from './Pages/LoginPage'
import { BrowserRouter as Router, Switch, Redirect, Route, useHistory } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import logo from './logo.svg';
import './App.css';




const App = () => {

  const [adminToken, setAdminToken] = useState(null);
  const [redirect, setRedirect] = useState({ from : null, to : null});

  // useEffect(()=>{
  //   return(<Redirect  to={'/home'} />)
  // },[redirect]);

  return (
    <Router >
      <Switch>
        <Route path='/home'>
          <MainScreen></MainScreen>
        </Route>
        <Route path='/admin'>
          {adminToken !== null ? (
            <AdminPanel adminToken={adminToken}></AdminPanel>
          ) : (
              <Redirect from="/admin" to="/login"></Redirect>
            )
          }
        </Route>
        <Route path='/login'>
          <LoginPage setAdminToken={setAdminToken} ></LoginPage>
        </Route>
        <Redirect from='/' to='/home' />
      </Switch>
    </Router>
  );
}

export default App;
