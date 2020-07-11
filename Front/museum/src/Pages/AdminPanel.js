import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'

import View from '../Components/View'
import AdminNavBar from '../Components/AdminNavBar'

const AdminPanel = (props) => {    

    const[activePanel,setActivePanel] = useState("EXPOSITIONS"); 

    return(
        <div className="Layout">
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
                <div id="EXPOSITIONS" style={{backgroundColor:"red", width:"100px", height:"100px"}}></div>
                <div id="EXHIBITS" style={{backgroundColor:"aqua", width:"100px", height:"100px"}}></div>
                <div id="LOG" style={{backgroundColor:"blue", width:"100px", height:"100px"}}></div>
            </View>
        </div>);
};


export default AdminPanel;
