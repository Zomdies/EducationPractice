import React, { useState, useEffect } from 'react';

import DismissOutline from '../../../Icons/dismiss_substract'
import SearchOutline from '../../../Icons/search_outline'

import defImage from '../../../Image/nophoto.png'

import './Css/ExhibitsAddList.css'

const ExhibitsAddList = (props) => {

    let { exhibits } = props
    const { setActivePopOut } = props

    exhibits = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, , 1, 1]

    return (
        <div className="list-container">
            <div id="top-line" className="flex-row y-center">
                Exhibits
                <DismissOutline onClick={() => { setActivePopOut(null) }} />
            </div>
            <div id="search">
                <div id="icon"><SearchOutline color="#323232"/></div>
                <input type="text" class="input" placeholder="Search" />
            </div>
            <div className="exhibts-container">
                {exhibits.map(exhibit =>{
                    return(
                    <div key={new Date()} className="check-card">
                        <img src={defImage}/>                        
                        <input type="checkbox" className="custom-checkbox" id="include"/>
                        <p>Puk-puk</p>
                        <label htmlFor="include"></label>
                    </div>                  
                    )
                })}
            </div>
        </div>
    );
};

export default ExhibitsAddList;
