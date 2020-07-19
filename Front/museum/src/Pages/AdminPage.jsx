import React, { useState, useEffect } from 'react';

import { View, NavBar, LineLabels, TokenVerification } from '../Components'
import { ExpositionPanel, ExhibitsPanel, LineLogPanel } from "../Panels"
import { ResetStoreExhibit } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux'

import '../Css/Pages/AdminPage.css'
import '../Components/PopOut/css/PopOut.css'
import { useHistory } from 'react-router-dom';

const AdminPanel = (props) => {

    const dispatch = useDispatch();
    const { token, token_verification } = useSelector(({ app }) => {
        return {
            token: app.token,
            token_verification: app.token_verification
        }
    });
    let history = useHistory();
    const [activePanel, setActivePanel] = useState("EXPOSITIONS");
    const [activePopOut, setActivePopOut] = useState(null);

    useEffect(() => {
        if (token === null) { history.push('/login') } else { history.push('/admin') }
    }, [token])


    //почему-то onClick  срабатывает сразу же либо клик по контейнеру проходит дальше и срабатывает установка
    // token_verification && 
    return (
        <>
            {token_verification &&  <TokenVerification></TokenVerification>}
            <div className="Layout">
                {activePopOut !== null ?
                    <div className="container">
                        <div className="filler" onClick={() => { setActivePopOut(null); dispatch(ResetStoreExhibit()); }} />
                        {activePopOut}
                    </div>
                    : null
                }
                <NavBar
                    id="navbar"
                    style={{ backgroundColor: "black", width: "100px", height: "100px" }}
                    linePosition="left"
                    lineWidth="5px"
                    lineSize="28px"
                    activeLine={activePanel}
                    botomContent={<p onClick={() => { }} >LOG OUT</p>}>
                    <p id="EXPOSITIONS" onClick={() => { setActivePanel("EXPOSITIONS") }}>EXPOSITIONS</p>
                    <p id="EXHIBITS" onClick={() => { setActivePanel("EXHIBITS") }}>EXHIBITS</p>
                    <p id="LOG" onClick={() => { setActivePanel("LOG") }}>LOG</p>
                </NavBar>
                <View activePanel={activePanel}>
                    <ExpositionPanel id="EXPOSITIONS" setActivePopOut={setActivePopOut} />
                    <ExhibitsPanel id="EXHIBITS" setActivePopOut={setActivePopOut} />
                    <LineLogPanel id="LOG" setActivePopOut={setActivePopOut} />
                </View>
            </div>
        </>
    );
};


export default AdminPanel;
