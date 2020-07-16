import React from 'react';

import './Css/Warning.css'

const Warning = (props) => {

    let { message } = props
    let { onAccept } = props
    let { onCancel } = props
    const { setActivePopOut } = props


    return (
        <div className="warning-container">   
            <div className="warning-name">
                WARNING
            </div>
            <div className="message">
                {message}
            </div>
            <div className="buttons-container">
                <div id="accept" onClick={()=>{onAccept && onAccept();setActivePopOut(null);}}>
                    YES
                </div>
                <div id="cancel" onClick={()=>{onCancel && onCancel();setActivePopOut(null);}}>
                    NO
                </div>
            </div>         
        </div>
    );
};

export default Warning;
