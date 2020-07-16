import React from 'react'

import {MainPanel} from '../Components'

import '../Css/Pages/LoginPage.css'

function LoginPage(props) {

    return (
        <MainPanel setAdminToken={props.setAdminToken} adminToken={props.adminToken}></MainPanel>
    )
}

export default LoginPage;