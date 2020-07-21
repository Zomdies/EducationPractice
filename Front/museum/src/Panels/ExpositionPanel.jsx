import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// import '../Css/AdminPage.css'
// import '../Css/Component/Cards.css'

import {
    Card, CardContainer,
    ExpositionEditor, ExpositionAdd,
    ExhibitsAddList, Warning,
    ToolTip,
} from '../Components'



import expositionImage from '../Image/Exposition.jpg'

import AddCircleOutline from '../Icons/add_circle_outline'
import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'
import { SetExposition, DeleteExposition} from '../Redux/actions/exposition';
import { server_url } from '../config';

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

const ExpositionPanel = (props) => {

    const dispatch = useDispatch();
    const { items, token } = useSelector(({ exposition, app }) => {
        // console.log(exposition);
        return ({
            items: exposition.items,
            token: app.token
        })
    })

    useEffect(() => {
        fetch(`${server_url}/exposition`)
            .then(res => res.json())
            .then(response => {
                // console.log(result);
                dispatch(SetExposition(response.result));
            })
            .catch(err => {
                console.log(err);
            });
    }, [])


    const deleteRequest = (item) =>{
        
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

    const { setActivePopOut } = props
    const warningMessage = "You want delete exposition. Are you sure ?"

    return (
        <div className="flex center">
            <CardContainer columnCount={2}>
                <div className="card light flex center" style={{ fontSize: 32 }} onClick={() => { setActivePopOut(<ExpositionAdd setActivePopOut={setActivePopOut} token={token} />) }}><p>NEW</p></div>
                {/* {loading && <Loader></Loader>} */}
                {items !== undefined && items.map((item) => {
                    return (
                        <Card
                            key={item._id}
                            image={`${server_url}/${item.Image}`}
                            // header={<p>{item.Name}<ToolTip id="cardNameTip">{item.Name}</ToolTip></p>}
                            header={<p>{item.Name}</p>}
                            icons={<>
                                <DeletOutline onClick={() => { setActivePopOut(<Warning message={warningMessage} setActivePopOut={setActivePopOut} item={item} onAccept={deleteRequest} />) }} />
                                <AddCircleOutline onClick={() => { setActivePopOut(<ExhibitsAddList setActivePopOut={setActivePopOut} exposition={item} token={token} />) }} />
                                <EditOutline onClick={() => { setActivePopOut(<ExpositionEditor setActivePopOut={setActivePopOut} item={item} token={token} />) }} />
                            </>}
                            content={
                                <>
                                    <p>Status: {item.Status}</p>
                                    <p>Date Open: {formatDate(new Date(item.Date_Open))}</p>
                                    <p>Date Close: {formatDate(new Date(item.Date_Close))}</p>
                                </>
                            }
                        />
                    )
                })
                }
            </CardContainer>
        </div>);
};

export default ExpositionPanel;


const linmap = (x, a, b, c, d) => {
    return c + (x - a) * (d - c) / (b - a)
}