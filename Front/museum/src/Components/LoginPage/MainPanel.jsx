import React, { useEffect, useState } from 'react'
import * as cryptoJS from 'crypto-js'
import {useDispatch, useSelector} from 'react-redux'

import {setToken} from '../../Redux/actions'
import './css/MainPanel.css'
import { server_url } from '../../config'
import { useHistory, } from 'react-router-dom';


export default function MainPanel(props) {
 
    let history = useHistory();
    const dispatch = useDispatch();
    const [textMessage, setTextMessage] = useState(null);

    const Message = () => {
        return (
            <div className="MainPanel-ErrorMessage">
                {
                    textMessage
                }
            </div>
        )
    }
    //props.setAdminToken(result.token);
    const sendRequest = () => {
        fetch(`${server_url}/login`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Login: document.getElementById("Login-Input").value,
                Password: cryptoJS.MD5(document.getElementById("Pass-Input").value).toString()
            })
        })
            .then(res => {
                var d = null;
                switch (res.status) {
                    case 200:
                        res.json().then(result => { 
                            document.cookie = "token="+result.token;
                            dispatch(setToken(result.token));
                            // localStorage.setItem('token', result.token)
                            history.push('/admin') })
                        break;
                    case 404:
                        setTextMessage("ERROR Login uncorrect");
                        break;
                    case 500:
                        setTextMessage("ERROR Password uncorrect");
                        break;
                }
            });
    }
    return (
        <>
            <div className="MainPanel-Body">
                <span className="MainPanel-HeaderText">ADMIN PANEL</span>
                {textMessage &&
                    <Message ></Message>
                }
                <div className="MainPanel-FormInput">
                    <span className="MainPanel-FormInput-Text">LOGIN</span>
                    <input className="MainPanel-FormInput-Input" id="Login-Input" type="text"></input>
                    <span className="MainPanel-FormInput-Text">PASSWORD</span>
                    <input className="MainPanel-FormInput-Input" id="Pass-Input" type="password"></input>
                    <button className="MainPanel-FormInput-Button" onClick={sendRequest}>LOG IN</button>
                </div>
            </div>
        </>
    )
}
