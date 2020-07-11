import React, { useState, useEffect } from 'react';
import '../CSS/AdminPanel.css'
import '../CSS/Cards.css'

import Card from '../Components/Card'

const ExpositionPanel = (props) => {   

    useEffect(()=>{
        const real = document.getElementById("real")
        const fake = document.getElementById("fake")
        const filler = document.getElementById("filler")

        fake.style.top=real.style.top;
        fake.style.left=real.style.left;


        filler.style.height = real.scrollHeight+"px";
    })

    const scrollReal = (e)=>
    {
        e.preventDefault();
        const real = document.getElementById("real")
        const fake = document.getElementById("fake")
        const filler = document.getElementById("filler")

        filler.style.height = real.scrollHeight+"px";

        const maxTopReal = real.scrollHeight-real.clientHeight;
        const maxTopFake = fake.scrollHeight-fake.clientHeight;

        fake.onscroll-=scrollFake;
        fake.scrollTo(0,linmap(real.scrollTop,0,maxTopReal,0,maxTopFake));
        fake.onscroll+=scrollFake;

        console.log(`Реальный:${real.scrollTop} ложный:${fake.scrollTop}`)


    }
    const scrollFake = (e)=>
    {
        e.preventDefault();
        const real = document.getElementById("real")
        const fake = document.getElementById("fake")
        const filler = document.getElementById("filler")

        filler.style.height = real.scrollHeight+"px";

        const maxTopReal = real.scrollHeight-real.clientHeight;
        const maxTopFake = fake.scrollHeight-fake.clientHeight;

        real.onscroll=null;
        // real.scrollTo(0,linmap(real.scrollTop,0,maxTopFake,0,maxTopReal));
        real.onscroll=scrollReal;

        console.log(`Реальный:${real.scrollTop} ложный:${fake.scrollTop}`)

    }
    return(
    
    <div>
        <div id="real" className="hidden-scroll container " onScroll={scrollReal} style={{zIndex:45}}>            
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>            
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        <div id="fake" className="fake-container" onScroll={scrollFake} style={{zIndex:1, padding:0, display:"block"}}> 
            <div id="filler"/>        
        </div>
    </div>);
};

export default ExpositionPanel;


const linmap = (x,a,b,c,d)=>
{
    return c + (x-a) * (d-c) / (b-a)
}