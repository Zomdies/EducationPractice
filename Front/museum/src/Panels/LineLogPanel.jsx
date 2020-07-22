import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Card, CardContainer } from '../Components'

import { SetExposition, SetExhibit } from '../Redux/actions';
import { server_url } from '../config';


import AddCircleOutline from '../Icons/add_circle_outline'
import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'

const ExpositionPanel = (props) => {


    const dispatch = useDispatch();
    const { expositions, exhibits, token } = useSelector(({ exposition, exhibit, app }) => {
        return ({
            expositions: exposition.items,
            exhibits: exhibit.items,
            token: app.token
        })
    })

    const [choosenExposition, setChoosenExposition] = useState(null)

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
    },[])

    const setExhibits = (exposition) => {
        setChoosenExposition(exposition)
        fetch(`${server_url}/exhibit`)
            .then(res => res.json())
            .then(response => {
                console.log(response.result);
                dispatch(SetExhibit(response.result.filter(item => item.Exposition.ID_Exposition === exposition._id)));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function formatDate(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
    
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
    
        var yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;
    
        return dd + '.' + mm + '.' + yy;
    }

    return (
        <div className="flex center" style={{ display: "grid", gridTemplate: "1fr/min-content min-content", gridGap: 30 }}>
            <div className="flex center">
                <div className="containerWithHeader">
                    <div className="flex center">
                        <p style={{ fontSize: 32 }}>EXPOSITIONS</p>
                    </div>
                    <CardContainer columnCount={1} style={{ paddingTop: 20, height: 750, boxShadow: "none" }}>
                        {expositions.map((exp, index) =>
                            <Card
                                tabindex={index}                                
                                className={"chooseabel"}
                                key={exp.Name}
                                image={`${server_url}/${exp.Image}`}
                                header={<p>{exp.Name}</p>}
                                content={
                                    <>
                                        <p>Status: {exp.Status}</p>
                                        <p>Date Open: {formatDate(new Date(exp.Date_Open))}</p>
                                        <p>Date Close: {formatDate(new Date(exp.Date_Close))}</p>
                                    </>}
                                onClick={() => { setChoosenExposition(exp); setExhibits(exp); console.log(exp) }}
                            />)}
                    </CardContainer>
                </div>
            </div>
            <div className="flex center">
                <div className="containerWithHeader">
                    <div className="flex center">
                        <p style={{ fontSize: 32 }}>EXHIBITS</p>
                    </div>
                    <CardContainer columnCount={1} style={{ paddingTop: 20, height: 750, boxShadow: "none" }}>
                        {choosenExposition !== null ?
                            (exhibits.length > 0 ? (exhibits.map(exh =>
                                <Card key={exh.Name}
                                    image={`${server_url}/${exh.Image}`}
                                    header={<p>{exh.Name}</p>}
                                    content={<div><p>Age: {exh.Age}</p><p>{exh.Description}</p></div>}
                                />)) : <div className="card flex center" style={{ fontSize: 24 }}>Choosen exposition doesn't have any exhibits</div>)
                            : <div className="card flex center" style={{ fontSize: 24 }}>Choose exposition</div>}
                    </CardContainer>
                </div>
            </div>
        </div>);
};

export default ExpositionPanel;


const linmap = (x, a, b, c, d) => {
    return c + (x - a) * (d - c) / (b - a)
}