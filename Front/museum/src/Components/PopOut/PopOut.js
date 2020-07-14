import React, { useState, useEffect } from 'react';
import './css/PopOut.css'


const PopOut = (props) => {   
    const {activePopOut} = props
    const {setActivePopOut} = props

    useEffect(()=>{},[activePopOut])
    
    console.log(activePopOut)
    console.log(setActivePopOut)
    console.log(props.setActivePopOut)
    return(
            <>
                {activePopOut === null || activePopOut === undefined ? null : 
                <div className="container" onClick={()=>{console.log("Click");props.setActivePopOut(null)}}>
                    {Array.isArray(props.children)? 
                        props.children.find(popout => popout.props.id == activePopOut)
                        :
                        props.children
                    }                   
                </div>}
            </>
        );
};
// return(props.children.find(panel => panel.props.id == activePanel));

export default PopOut;
