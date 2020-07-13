import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

import CardContainer from '../Components/CardContainer'
import Card from '../Components/Card'

import expositionImage from '../Image/Exposition.jpg'

const ExpositionPanel = (props) => {   
  
    return(    
    <div className="flex center" style={{display:"grid", gridTemplate:"1fr/min-content min-content", gridGap:30}}>
        <div className="flex center">            
            <div className="containerWithHeader">   
                <div className="flex center">
                    <p style={{fontSize:32}}>EXPOSITIONS</p>
                </div>    
                <CardContainer columnCount={1} style={{paddingTop:20, height:750, boxShadow:"none"}}>                     
                    <Card 
                        image={expositionImage}
                        header={<p>This is Exposition</p>}
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
                </CardContainer>
            </div> 
        </div> 
        <div className="flex center">            
            <div className="containerWithHeader">   
                <div className="flex center">
                    <p style={{fontSize:32}}>EXHIBITS</p>
                </div>    
                <CardContainer columnCount={1} style={{paddingTop:20, height:750, boxShadow:"none"}}>                     
                    <Card 
                        image={expositionImage}
                        header={<p>This is Exhibit</p>}
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
                </CardContainer>
            </div> 
        </div> 
    </div>);
};

export default ExpositionPanel;


const linmap = (x,a,b,c,d)=>
{
    return c + (x-a) * (d-c) / (b-a)
}