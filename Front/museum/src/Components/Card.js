import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

const Card = (props) => {   

    
    return(
            <div className="card layout">
                <div style={{background:"crimson", gridArea:"image"}}></div>
                <div style={{background:"darksalmon", gridArea:"header"}}></div>
                <div style={{background:"indianred", gridArea:"content"}}></div>
                <div style={{background:"bisque", gridArea:"icons"}}></div>
            </div>
        );
};

export default Card;
