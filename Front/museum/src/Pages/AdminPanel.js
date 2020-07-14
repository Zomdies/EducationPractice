import React, { useState, useEffect } from 'react';


import '../CSS/AdminPanel.css'

import View from '../Components/View'
import AdminNavBar from '../Components/AdminNavBar'

import ExpositionPanel from '../Panels/ExpositionPanel'
import ExhibitsPanel from '../Panels/ExhibitsPanel'
import LineLogPanel from '../Panels/LineLogPanel'
import PopOut from '../Components/PopOut/PopOut';

const AdminPanel = (props) => {    

    const[activePanel,setActivePanel] = useState("EXPOSITIONS");    

    const[activePopOut, setActivePopOut] = useState("is");      
    
    const eas = () =>
    {
        console.log("as")
        setActivePopOut(null)
        console.log(activePopOut)
    }

    //почему-то onClick  срабатывает сразу же либо клик по контейнеру проходит дальше и срабатывает установка
    return(
        <div className="Layout" onClick={()=>{console.log("!!",setActivePopOut("iass"))}}>
            <PopOut activePopOut={activePopOut} setActivePopOut={(a)=>{eas(a)}}>
                <p id="is">
                    Земля плоская   
                </p>
                <p id="iass">
                    Колобок повесился   
                </p>
            </PopOut>
            <AdminNavBar 
                id="navbar"                 
                style={{backgroundColor:"black", width:"100px", height:"100px"}}
                linePosition="left"
                lineWidth="5px"
                lineSize="28px"
                activeLine={activePanel}
                botomContent={<p>LOG OUT</p>}
            >
                <p id="EXPOSITIONS" onClick={()=>{setActivePanel("EXPOSITIONS")}}>EXPOSITIONS</p>
                <p id="EXHIBITS" onClick={()=>{setActivePanel("EXHIBITS")}}>EXHIBITS</p>
                <p id="LOG" onClick={()=>{setActivePanel("LOG")}}>LOG</p>
            </AdminNavBar>
            <View activePanel={activePanel}>
                <ExpositionPanel id="EXPOSITIONS" style={{backgroundColor:"red", width:"100px", height:"100px"}}/>
                <ExhibitsPanel id="EXHIBITS" style={{backgroundColor:"aqua", width:"100px", height:"100px"}}/>
                <LineLogPanel id="LOG" style={{backgroundColor:"blue", width:"100px", height:"100px"}}/>
            </View>
        </div>);
};


export default AdminPanel;
