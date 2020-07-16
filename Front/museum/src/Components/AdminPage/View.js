import React, { useState, useEffect } from 'react';


const View = (props) => {  
    
    const[activePanel,setActivePanel] = useState(props.activePanel);
    
    useEffect(()=>{setActivePanel(props.activePanel)},[props.activePanel])   
         
    return(props.children.find(panel => panel.props.id == activePanel));
};


export default View;
