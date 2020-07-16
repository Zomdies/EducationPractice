import React, { useState, useEffect } from 'react';
// import '../Css/AdminPage.css'


const AdminNavBar = (props) => {
    const lineSize = props.lineSize === undefined ? "25px" : props.lineSize;
    const lineGap = props.lineGap === undefined ? "30px" : props.lineGap;
    const {lineColor} = props;
    const {linePosition} = props;
    const strPosition = linePosition === "right" ? "flex-end" : "flex-start";
    const lineWidth = props.lineWidth === undefined ? "10px": props.lineWidth;

    const labelTopMargin="150px";
    const lineTopMargin="25px";
    
    const {botomContent} = props;

    const increasingIndex = props.increasingIndex === undefined ? "12px" : props.increasingIndex ;
    const[activeLine,setActivePart] = useState(props.activeLine); 

    const spacing = "30px";

    const lineStyle={width:lineWidth};
    lineStyle[linePosition]=(parseInt(spacing)-15);
    

    const layoutStyle={}
    layoutStyle[`padding${ucFirst(linePosition)}`]=spacing;
    
    useEffect(()=>{setActivePart(props.activeLine)},[props.activeLine])

    return(
        <div style={{...layoutStyle, marginTop:lineTopMargin}}>  
            <div className='line-r' style={{...lineStyle, height:parseInt(labelTopMargin)-parseInt(lineTopMargin), top:"auto"}}/>
            {props.children !== null ? props.children.map((block,index) => {                
                const _fontSize = block.props.id == activeLine ? (parseInt(lineSize) + parseInt(increasingIndex))+"px": lineSize;
                return(
                    <>
                        <div 
                            key={block.props.id} 
                            style={{
                                fontSize: _fontSize, 
                                width:"100%", 
                                display:"flex", 
                                justifyContent:strPosition,
                                }}>
                            {block}
                        </div>
                        {props.children[index+1] !==  undefined ? 
                            <div className='line-r' style={{...lineStyle, height:lineGap, top:"auto"}}/>
                            :<div className='line-r' style={{...lineStyle, height:"350px", top:"auto"}}/>}                        
                    </>)
            }):null}
            <div 
                style={{
                    fontSize: lineSize, 
                    width:"100%", 
                    display:"flex", 
                    justifyContent:strPosition,
                    }}>
                {botomContent}
            </div>  
        </div>);
};

function ucFirst(str) {
    if (!str) return str;
  
    return str[0].toUpperCase() + str.slice(1);
  }

export default AdminNavBar;
