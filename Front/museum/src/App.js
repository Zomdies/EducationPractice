import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { HomePage, AdminPage, LoginPage, PreviewPage} from './Pages'
import {checkToken} from './Redux/actions'

import { server_url } from './config';


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const App = () => {

  const dispatch = useDispatch();
  const { token } = useSelector(({app}) => {
      return {
          token : app.token
      }
  });
  // console.log(getCookie("token"));
  // dispatch(checkToken(getCookie("token")))
  // const [adminToken, setAdminToken] = useState(token);
  let history = useHistory();

  useEffect(() => {

    // var tokenLive = () => {
    //   fetch(`${server_url}/tokenLive`, {
    //     method: 'post',
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
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
    dispatch(checkToken(getCookie("token")))
  }, []);

  return (
    <Switch>
      <Route path='/home'>
        <HomePage />
      </Route>
      <Route exact path='/preview'>
        <PreviewPage/>
      </Route>
      <Route exact path='/admin' >
        <AdminPage adminToken={token} />
      </Route>
      <Route exact path='/login'>
        <LoginPage />
      </Route>      
      <Redirect from='/' to='/home' />
    </Switch>
  );
}

export default App;
