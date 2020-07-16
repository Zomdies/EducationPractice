import React, { useState, useEffect } from 'react';

import {View, AdminNavBar, LineLabels} from '../Components'
import {ExpositionPanel, ExhibitsPanel, LineLogPanel} from "../Panels"

import '../Css/Pages/AdminPage.css'
import '../Components/PopOut/css/PopOut.css'

const AdminPanel = (props) => {    

    const[activePanel,setActivePanel] = useState("EXPOSITIONS");    

    const[activePopOut, setActivePopOut] = useState(null);      
       

    //почему-то onClick  срабатывает сразу же либо клик по контейнеру проходит дальше и срабатывает установка
    return(
        <div className="Layout">
            {activePopOut !== null ?
                <div className="container">
                    <div className="filler"  onClick={()=>{setActivePopOut(null)}}/>
                    {activePopOut}
                </div>
                :null
            }           
            <AdminNavBar 
                id="navbar"                 
                style={{backgroundColor:"black", width:"100px", height:"100px"}}
                linePosition="left"
                lineWidth="5px"
                lineSize="28px"
                activeLine={activePanel}
                botomContent={<p>LOG OUT</p>}>
                <p id="EXPOSITIONS" onClick={()=>{setActivePanel("EXPOSITIONS")}}>EXPOSITIONS</p>
                <p id="EXHIBITS" onClick={()=>{setActivePanel("EXHIBITS")}}>EXHIBITS</p>
                <p id="LOG" onClick={()=>{setActivePanel("LOG")}}>LOG</p>
            </AdminNavBar>
            <View activePanel={activePanel}>
                <ExpositionPanel id="EXPOSITIONS" setActivePopOut={setActivePopOut}/>
                <ExhibitsPanel id="EXHIBITS" style={{backgroundColor:"aqua", width:"100px", height:"100px"}}/>
                <LineLogPanel id="LOG" style={{backgroundColor:"blue", width:"100px", height:"100px"}}/>
            </View>
        </div>);
};


export default AdminPanel;
