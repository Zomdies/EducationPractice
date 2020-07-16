import React, { useState, useEffect } from 'react';


const CardContainer = (props) => {   
    const columnCount = props.columnCount === null ? 1 :props.columnCount;    

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
