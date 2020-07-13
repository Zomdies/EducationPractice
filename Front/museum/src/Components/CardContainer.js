import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

const CardContainer = (props) => {   
    const columnCount = props.columnCount === null ? 1 :props.columnCount;    

    console.log(props)

    let columnTemplate="";
    for(let i=0;i<columnCount;i++)
        columnTemplate+="1fr "

    return(
            <div  className="card-container" style={{...props.style,gridTemplateColumns:columnTemplate}}>
                {props.children}
            </div>
        );
};

export default CardContainer;
