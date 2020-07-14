import React, { useEffect, useState } from 'react'
import * as cryptoJS from 'crypto-js'

import './css/MainPanel.css'
import { server_url } from '../../config'
import { useHistory, Redirect } from 'react-router-dom';


export default function MainPanel(props) {
 
    const [a, setA] = useState(null);
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
                        res.json().then(result => { props.setAdminToken(result.token); setA(1); })
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
    const foo = () => {
        setA(null);
        return (<Redirect to="/admin"></Redirect>)
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
            {a &&
                (<Redirect to="/admin"></Redirect>)
            }
        </>
    )
}
