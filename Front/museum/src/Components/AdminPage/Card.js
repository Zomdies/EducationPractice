import React, { useState, useEffect } from 'react';
import '../../Css/Components/Cards.css'

const Card = (props) => {   
    const {className} = props;
    const {image} = props;
    const {imageStyle} = props;
    const {icons} = props;
    const {iconsStyle} = props;
    const {header} = props;
    const {headerStyle} = props;
    const {content} = props;
    const {style} = props;
    const {contentStyle} = props;
    const {onClick} = props;
    

    return(
            <div tabindex={props.tabindex} className={`card layout ${className}`} style={{...style}}onClick={()=>{if(onClick !== undefined) onClick()}}>
                <div className="flex center" style={{gridArea:"image"}}><img className="min-image" style={{...imageStyle}} src={image}/></div>
                <div className="header" style={{ ...headerStyle, gridArea:"header"}}>{header}</div>
                <div className="content" style={{ ...contentStyle, gridArea:"content"}}>{content}</div>
                <div className="icons"  style={{ justifyContent:"right" ,...iconsStyle, gridArea:"icons"}}>{icons}</div>
            </div>
        );
};

export default Card;
