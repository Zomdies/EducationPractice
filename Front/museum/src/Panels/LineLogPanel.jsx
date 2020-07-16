import React, { useState, useEffect } from 'react';
// import '../Css/AdminPage.css'
// import '../Css/Cards.css'

import {Card, CardContainer} from '../Components'


import expositionImage from '../Image/Exposition.jpg'

import AddCircleOutline from '../Icons/add_circle_outline'
import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'

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