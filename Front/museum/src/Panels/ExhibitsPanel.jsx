import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { Card, CardContainer, ExhibitEditor, Warning } from '../Components'

import expositionImage from '../Image/Exposition.jpg'
import { server_url } from '../config';


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
                <div className="card light flex center" style={{ fontSize: 32 }}><p>NEW</p></div>
                {items.map(item => {return(
                    <Card
                        image={`${server_url}/${item.Image}`}
                        header={<p>{item.Name}</p>}
                        icons={<>
                            <DeletOutline onClick={() => { setActivePopOut(<Warning message={warningMessage} setActivePopOut={setActivePopOut} />) }} />
                            <EditOutline onClick={() => { setActivePopOut(<ExhibitEditor setActivePopOut={setActivePopOut} item={item} token={token}/>) }} />
                        </>}
                        content={<div><p>Age: {item.Age}</p><p>{item.Description}</p></div>}
                    />
                )})}
            </CardContainer>
        </div>);
};

export default ExhibitsPanel;


