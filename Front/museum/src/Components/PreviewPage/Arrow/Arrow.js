


import React from 'react';

const Arrow = (props) => {
    let {size} = props
    const {direction} = props
    const degr = direction !== "left" ? 180 : 0;     
    if(size===undefined) size=1
    const color = props.color === undefined ? "#FFFFFF" : props.color

    return (<svg style={{transform:`rotateZ(${degr}deg)`, cursor:"pointer"}} onClick={props.onClick} width={103*size} height={57*size} viewBox="0 0 103 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
            <path d="M21.2322 26.2322C20.2559 27.2085 20.2559 28.7915 21.2322 29.7678L37.1421 45.6777C38.1184 46.654 39.7014 46.654 40.6777 45.6777C41.654 44.7014 41.654 43.1185 40.6777 42.1421L26.5355 28L40.6777 13.8579C41.654 12.8816 41.654 11.2986 40.6777 10.3223C39.7014 9.34602 38.1184 9.34602 37.1421 10.3223L21.2322 26.2322ZM83 25.5L23 25.5L23 30.5L83 30.5V25.5Z" fill="white" />
        </g>
        <defs>
            <filter id="filter0_d" x="0.5" y="-10.4099" width="102.5" height="76.8198" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="10" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </defs>
    </svg>
    )
}

export default Arrow