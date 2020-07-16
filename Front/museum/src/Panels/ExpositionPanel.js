import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

import CardContainer from '../Components/CardContainer'
import Card from '../Components/Card'
import ExpositionEditor from '../Components/ExpositionEditor/ExpositionEditor'

import expositionImage from '../Image/Exposition.jpg'

import AddCircleOutline from '../Icons/add_circle_outline'
import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'


const ExpositionPanel = (props) => {   
    
    const {setActivePopOut}=props

    return(    
    <div className="flex center">
        <CardContainer columnCount={2}>    
            <div className="card light flex center" style={{fontSize:32}} onClick={()=>{setActivePopOut(<ExpositionEditor setActivePopOut={setActivePopOut}/>)}}><p>NEW</p></div>            
            <Card 
                image={expositionImage}
                header={<p>This is Expostition</p>}
                icons={<>
                        <DeletOutline/>
                        <AddCircleOutline onClick={()=>{console.log("SSADF")}}/>
                        <EditOutline onClick={()=>{setActivePopOut(<ExpositionEditor setActivePopOut={setActivePopOut}/>)}}/>
                    </>} 
                content={"Волк слабее льва и тигра, но в цирке волк не выступает"}
            />
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
            <Card image={expositionImage}/>
        </CardContainer>        
    </div>);
};

export default ExpositionPanel;


const linmap = (x,a,b,c,d)=>
{
    return c + (x-a) * (d-c) / (b-a)
}