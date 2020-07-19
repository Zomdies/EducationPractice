import React  from 'react';
import {useDispatch} from 'react-redux'

import {DeleteExposition} from '../../../Redux/actions'
import { server_url } from '../../../config';
import './Css/Warning.css'


const Warning = ({message, setActivePopOut, item, token}) => {

    const dispatch = useDispatch();

    const deleteRequest = () =>{
        
        fetch(`${server_url}/exposition`,{
            method: "DELETE",
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                _id : item._id,
                token : token
            })
        })
        .then(res =>{
            switch (res.status) {
                case 200:
                    res.json().then(response => {
                        alert("Exposition Delete");
                        // console.log(response);
                        dispatch(DeleteExposition(item));
                        setActivePopOut(null);
                    });
                    break;
                case 404:
                    alert("Porblems with Server")
                    break;
                case 500:
                    alert("Porblems with Server")
                    break;
            }
        })
        .catch(err => alert("Server Error"));
        setActivePopOut(null);
    }
    // console.log(item);
    return (
        <div className="warning-container">   
            <div className="warning-name">
                WARNING
            </div>
            <div className="message">
                {message}
            </div>
            <div className="buttons-container">
                <div id="cancel" onClick={()=>{deleteRequest()}}>
                    YES
                </div>
                <div id="accept" onClick={()=>{setActivePopOut(null);}}>
                    NO
                </div>
            </div>         
        </div>
    );
};

export default Warning;
