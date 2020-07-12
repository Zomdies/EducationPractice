import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

import Card from '../Components/Card'
import expositionImage from '../Image/Exposition.jpg'

const ExpositionPanel = (props) => {   
  
    return(    
    <div className="flex center">
        <div className="card-container" >            
            <Card 
                image={expositionImage}
                header={<p>Chairs infinity and the picture of the world</p>}
                icons={<><div style={{background:"#ff3", width:24, height:24}}/><div style={{background:"#a2b", width:24, height:24}}/><div style={{background:"#ff3", width:24, height:24}}/></>} 
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
        </div>        
    </div>);
};

export default ExpositionPanel;


const linmap = (x,a,b,c,d)=>
{
    return c + (x-a) * (d-c) / (b-a)
}