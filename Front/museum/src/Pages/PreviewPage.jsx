import React, { useState, useEffect } from 'react';

import floor3Image from '../Image/Floor3.png'

import { SidePanel, Arrow, ExhibitsPreview } from '../Components'

import '../Css/Pages/PreviewPage.css'

const PreviewPage = (props) => {

    const [activePopOut, setActivePopOut] = useState(null);

    

    //почему-то onClick  срабатывает сразу же либо клик по контейнеру проходит дальше и срабатывает установка
    return (
        <div id="bg" style={{backgroundImage:`url(${floor3Image})`}}>
            {activePopOut !== null ?
                <div className="container">
                    <div className="filler" onClick={() => { setActivePopOut(null) }} />
                    {activePopOut}
                </div>
                : null
            }
            <SidePanel 
                bottomContent={
                    <p style={{fontSize:32}}>Back</p>
                }
            >
                <p style={{fontSize:56}}>
                    Hall XX
                </p>
            </SidePanel>
            <div id="expPreview">
                <img src={floor3Image} onClick={()=>{setActivePopOut(<ExhibitsPreview setActivePopOut={setActivePopOut}/>)}}/>
                <div id="arrows">
                <Arrow direction="left"/>
                <p>Exposition Name</p>
                <Arrow/>
                </div>
            </div>
        </div>);
};


export default PreviewPage;
