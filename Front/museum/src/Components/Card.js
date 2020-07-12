import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

const Card = (props) => {   
    const {image} = props;
    const {imageStyle} = props;
    const {icons} = props;
    const {iconsStyle} = props;
    const {header} = props;
    const {headerStyle} = props;
    const {content} = props;
    const {contentStyle} = props;
    
    console.log(image)

    return(
            <div className="card layout">
                <div className="flex center" style={{gridArea:"image"}}><img className="min-image" style={{...imageStyle}} src={image}/></div>
                <div className="header" style={{ ...headerStyle, gridArea:"header"}}>{header}</div>
                <div className="content" style={{ ...contentStyle, gridArea:"content"}}>{content}</div>
                <div className="icons"  style={{ justifyContent:"right" ,...iconsStyle, gridArea:"icons"}}>{icons}</div>
            </div>
        );
};

export default Card;