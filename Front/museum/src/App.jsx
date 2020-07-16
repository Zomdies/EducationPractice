import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'


import { HomePage, AdminPage, LoginPage } from './Pages'

import { token, server_url } from './config';


// function getCookie(name) {
//   let matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }

const App = () => {

  const [adminToken, setAdminToken] = useState(token);
  let history = useHistory();

  useEffect(() => {

    // var tokenLive = () => {
    //   fetch(`${server_url}/tokenLive`, {
    //     method: 'post',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       token: adminToken
    //     })
    //   })
    //     .then(res => {
    //       var d = null;
    //       switch (res.status) {
    //         case 200:
    //           res.json().then(result => {
    //             setAdminToken(adminToken);
    //           })
    //           break;
    //         case 500:
    //           setAdminToken(null)
    //           history.push('/login');
    //           break;
    //       }
    //     });
    // };
    // tokenLive();
  }, []);

  return (
    <Switch>
      <Route path='/home'>
        <HomePage />
      </Route>
      <Route exact path='/admin' >
        <AdminPage adminToken={adminToken} />
      </Route>
      <Route exact path='/login'>
        <LoginPage setAdminToken={setAdminToken} />
      </Route>
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

export default App;
