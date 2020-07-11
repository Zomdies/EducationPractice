import React, { useState, useEffect } from 'react';
import '../CSS/mainscreen.css'

const MainScreenBox = (props) => {    
    return(
        <div className="background-image" style={{backgroundImage: `url(${props.image})`}}>
            <div className="block-header">
            {props.header}
            </div>            
            <div className="block-content" style={{marginTop: props.contenMarginTop}}>
            {props.content}
            </div>
        </div>);
};


export default MainScreenBox;
