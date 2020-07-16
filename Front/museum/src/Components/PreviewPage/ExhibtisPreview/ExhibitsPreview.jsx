import React, { useState, useEffect } from 'react';
import './Css/ExhibitsPreview.css'

import { CardContainer, Card } from '../../../Components'
import DismissOutline from '../../../Icons/dismiss_substract'


const ExhibitsPreview = (props) => {    

    const {bottomContent} = props
    const {setActivePopOut} = props
    
    const exhibits =[1,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1,,1]

    return(<div>
        <CardContainer style={{padding:50}} id="exhPreview" columnCount={2}> 
        {exhibits.map(exhibit =>{      
            return(<Card 
                image={null}
                header={<p>This is Exhibit</p>}              
                content={"Волк слабее льва и тигра, но в цирке волк не выступает"}
            />   
    )})   
        }
        </CardContainer> 
        <div className="closeIcon"><DismissOutline onClick={()=>{setActivePopOut(null)}}/></div>                
        </div>
    );
};


export default ExhibitsPreview;
