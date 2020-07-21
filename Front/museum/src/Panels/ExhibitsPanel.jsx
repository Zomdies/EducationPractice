import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { Card, CardContainer, ExhibitEditor, Warning, ExhibitAdd } from '../Components'

import { server_url } from '../config';
import {DeleteExhibit} from '../Redux/actions/exhibit' 

import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'
import { SetExhibit } from '../Redux/actions';

const ExhibitsPanel = (props) => {

    
    const { setActivePopOut } = props

    const warningMessage = "You want to delete exhibit from exposition. Are you sure ?"

    const dispatch = useDispatch();
    const { items, token } = useSelector(({ exhibit, app }) => {
        return ({
            items: exhibit.items,
            token: app.token
        })
    })

    const deleteRequest = (item) =>{
        
        fetch(`${server_url}/exhibit`,{
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
                        alert("Exhibit has been deleted");
                        // console.log(response);
                        dispatch(DeleteExhibit(item));
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

    useEffect(() => {
        fetch(`${server_url}/exhibit`)
            .then(res => res.json())
            .then(response => {
                dispatch(SetExhibit(response.result));
            })
            .catch(err => {
                console.log(err);
            });
    }, [])    

    return (
        <div className="flex center">
            <CardContainer columnCount={2}>
                <div className="card light flex center" style={{ fontSize: 32 }} onClick={() => { setActivePopOut(<ExhibitAdd setActivePopOut={setActivePopOut} token={token}/>) }}><p>NEW</p></div>
                {items.map(item => {return(
                    <Card
                        image={`${server_url}/${item.Image}`}
                        header={<p>{item.Name}</p>}
                        icons={<>
                            <DeletOutline onClick={() => { setActivePopOut(<Warning message={warningMessage} setActivePopOut={setActivePopOut} item={item} onAccept={deleteRequest} />) }} />
                            <EditOutline onClick={() => { setActivePopOut(<ExhibitEditor setActivePopOut={setActivePopOut} item={item} token={token}/>) }} />
                        </>}
                        content={<div><p>Age: {item.Age}</p><p>{item.Description}</p></div>}
                    />
                )})}
            </CardContainer>
        </div>);
};

export default ExhibitsPanel;


