import React, { useState, useEffect } from 'react';

import './ExpositionEditor.css'

import { server_url } from '../../config'

import DismissOutline from '../../Icons/dismiss_substract'
import DoneOutline from '../../Icons/done_substract'
import defImage from '../../Image/nophoto.png'

const ExpositionEditor = (props) => {       
    const {exposition} = props
    const {setActivePopOut} = props
  
    const imgSource = exposition !== undefined ? server_url+exposition.Image : defImage;
   
    return(
            <div className="editor-layout">
                <div className="flex-center" style={{gridArea:"image"}}>
                    <img className="exp-image" src={imgSource}/>
                </div>  
                <div className="icons-container" style={{gridArea:"icons"}}>
                    <DoneOutline/>
                    <DismissOutline onClick={()=>{setActivePopOut(null)}}/>
                </div>
                <div style={{gridArea:"content"}}>
                    <from></from>
                </div>
            </div>
        );
};

export default ExpositionEditor;
