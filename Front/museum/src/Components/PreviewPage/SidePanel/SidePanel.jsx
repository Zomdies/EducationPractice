import React, { useState, useEffect } from 'react';
import './Css/SidePanel.css'


const SidePanel = (props) => {    

    const {bottomContent} = props

    return(
        <div className="side-bar">
            <div className="bar-line" style={{height:90, marginTop:25}}/>
            {props.children}
            <div className="bar-line grow" style={{height:90, width:5}}/>
            {bottomContent}
        </div>);
};


export default SidePanel;
