import React, { useState, useEffect } from 'react';
// import '../Css/AdminPage.css'
// import '../Css/Cards.css'

import {Card, CardContainer,ExhibitEditor,Warning} from '../Components'

import expositionImage from '../Image/Exposition.jpg'


import DeletOutline from '../Icons/delete_ouline'
import EditOutline from '../Icons/edit_outline'

const ExhibitsPanel = (props) => {   

    const {setActivePopOut} = props

    const warningMessage="You want to delete exhibit from exposition. Are you sure ?"
  
    return(    
    <div className="flex center">
        <CardContainer columnCount={2}>            
            <div className="card light flex center" style={{fontSize:32}}><p>NEW</p></div>                        
            <Card 
                image={expositionImage}
                header={<p>This is Exhibit</p>}
                icons={<>
                    <DeletOutline onClick={()=>{setActivePopOut(<Warning message={warningMessage} setActivePopOut={setActivePopOut}/>)}}/>
                    <EditOutline onClick={()=>{setActivePopOut(<ExhibitEditor setActivePopOut={setActivePopOut}/>)}}/>
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

export default ExhibitsPanel;


