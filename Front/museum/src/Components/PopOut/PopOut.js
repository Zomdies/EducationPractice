import React, { useState, useEffect } from 'react';
import './css/PopOut.css'


const PopOut = (props) => {   
    const {activePopOut} = props
    const {setActivePopOut} = props

    useEffect(()=>{},[activePopOut])    

    return(
            <>
                {activePopOut === null || activePopOut === undefined ? null : 
                <div className="container" onClick={()=>{props.setActivePopOut(null)}}>
                    {Array.isArray(props.children)? 
                        props.children.find(popout => popout.props.id == activePopOut)
                        :
                        props.children
                    }                   
                </div>}
            </>
        );
};
export default PopOut;
