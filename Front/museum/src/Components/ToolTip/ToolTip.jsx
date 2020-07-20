import React, { useState, useEffect } from 'react';
import './Css/ToolTip.css'


const ToolTip = (props) => {

    const outDistance=15;
    const delta=120
    const fadeTime = 500;
    const id= new Date().valueOf()    

    useEffect(() => {

        const elem = document.getElementById(id);
        const parent = elem.parentElement;
        let fadeTimer;
        parent.onmouseenter = (e) => {
            fadeTimer = setTimeout(() => { elem.style.setProperty("opacity", "100%") }, fadeTime)            
            parent.onmousemove = (e) => {
                elem.style.setProperty("top", `${e.pageY-delta}px`)
            }
        }

        parent.onmouseleave = (e) => {
            elem.style.setProperty("opacity", "0%")
            elem.style.setProperty("top", `${e.pageY-(delta+outDistance)}px`)
            if (fadeTimer) clearTimeout(fadeTimer)
        }

    },[])

    return (
        <div id={id} className={"tooltip"}>
            {props.children}
        </div>
    );
};
export default ToolTip;


// $(function(){
//     let hint=$('#hint'),
//     hintTimer,
//     fadeTime=400
//     $('.block').on('mouseenter', function(e) {
//       let el=$(this)
//       el.mousemove(function(pos) {
//         hint
//           .css('left', (pos.pageX + 50)+'px')
//           .css('top', (pos.pageY - 30)+'px');
//       });
//       hintTimer=setTimeout(()=>hint.html(el.attr('hint')).fadeIn(fadeTime),fadeTime)
//     });
//     $('.block').on('mouseleave', function(e) {
//       if(hintTimer) clearTimeout(hintTimer)
//       hint.off('mousemove').fadeOut(fadeTime)
//     });
//     })