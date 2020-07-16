import React, { useState, useEffect } from 'react';
import '../../Css/Components/LineLabels.css'

const LineLabels = ({labels, labelSize, labelAlign="left", lineHeight, lineWidth="5px", lineColor = "#FFFFFF", pageCount, pageHeight, pageAlign, pageMargin="100px"}) => {
       
    const margin="75px"
    
    labels = labels != null ? labels.split(',') : null;
    lineHeight = lineHeight == null ? pageHeight-(parseInt(labelSize)+15) : lineHeight
   
    const mainstyle = 
    {
        position: "absolute",
        top: margin,
        width: "fit-content",
        isolation: "isolate"     
    }
    mainstyle[pageAlign] = pageMargin;        
    
    return(
        <div style={mainstyle}>                        
            {labels? 
                    labels.map((lab,index) => {return(
                        <>
                            <div
                                style={{
                                    textAlign: labelAlign, 
                                    fontSize:labelSize, 
                                    position:"relative", 
                                    top:index*(pageHeight-parseInt(labelSize)-15)+20,
                                    width: "100%"
                                    }}>
                                {lab}
                            </div>
                            {labels[index+1] != undefined ? 
                                <div className="line" 
                                style={
                                    {
                                        left: "50%",
                                        width:lineWidth, 
                                        height:lineHeight, 
                                        top:parseInt(margin)+index*(lineHeight+parseInt(labelSize)+17), 
                                        backgroundColor:{lineColor},
                                    }}>                
                                </div>
                            :null}
                        </>)
                    })
                :null}
        </div>
    )
        
};
// comments.find(item => item.id == UsersData.id).text
{/* <Cell key={user.id} before={<Avatar src={user.photo_50}/>}>{user.last_name} {user.first_name}</Cell> */}

export default LineLabels;
