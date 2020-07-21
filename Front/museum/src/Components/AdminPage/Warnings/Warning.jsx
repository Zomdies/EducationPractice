import React  from 'react';
import './Css/Warning.css'


const Warning = (props) => {

    const {message} = props
    const {setActivePopOut} = props
    const {item} = props
    const {onAccept} = props
    const {onCancel} = props

    return (
        <div className="warning-container">   
            <div className="warning-name">
                WARNING
            </div>
            <div className="message">
                {message}
            </div>
            <div className="buttons-container">
                <div id="accept" onClick={()=>{if(onAccept !== undefined) onAccept(item)}}>
                    YES
                </div>
                <div id="cancel" onClick={()=>{if(onCancel !== undefined) onCancel(item);setActivePopOut(null);}}>
                    NO
                </div>
            </div>         
        </div>
    );
};

export default Warning;
