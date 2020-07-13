import React from 'react'

import MainPanel from '../Components/LoginPage/MainPanel'

import '../CSS/LoginPage.css'

function LoginPage(props) {
    return (
        <MainPanel setAdminToken={props.setAdminToken} adminToken={props.adminToken} ></MainPanel>
    )
}

export default LoginPage;