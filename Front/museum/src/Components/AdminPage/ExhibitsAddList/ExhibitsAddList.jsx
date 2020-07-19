import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import DismissOutline from '../../../Icons/dismiss_substract'
import SearchOutline from '../../../Icons/search_outline'

import defImage from '../../../Image/nophoto.png'

import './Css/ExhibitsAddList.css'
import { GetExhibitNotExposition, ResetStoreExhibit  } from '../../../Redux/actions';
import { server_url } from '../../../config';
import { Loader } from '../..';

const ExhibitsAddList = ({ exposition, setActivePopOut }) => {

    const dispatch = useDispatch();
    const { items, loading } = useSelector(({ exhibit, app }) => {
        // console.log(exhibit);
        return {
            items: exhibit.items,
            loading : app.loading
        }
    });

    let selected = [];

    useEffect(() => {
        dispatch(GetExhibitNotExposition(exposition._id));

    }, [])

    const postAddExhibitInExposition = (item) => {
        fetch(`${server_url}/exhibit`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: item._id,
                ID_Exposition: exposition._id,
                token: '123'
            })
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        res.json().then(result => {
                            console.log(result);
                            dispatch(GetExhibitNotExposition(exposition._id));
                            // document.cookie = "token="+result.token;
                            // localStorage.setItem('token', result.token)
                            // history.push('/admin') })
                        })
                        break;
                    case 404:
                        alert("ERROR Login uncorrect");
                        break;
                    case 500:
                        alert("ERROR Password uncorrect");
                        break;
                }
            })
    }

    return (
        <div className="list-container">
            <div id="top-line" className="flex-row y-center">
                Exhibits
                <DismissOutline onClick={() => { setActivePopOut(null); dispatch(ResetStoreExhibit()); }} />
            </div>
            <div id="search">
                <div id="icon"><SearchOutline color="#323232" /></div>
                <input type="text" className="input" placeholder="Search" />
            </div>
            {loading && <Loader></Loader>}
            <div className="exhibts-container">
                {items.map(item => {
                    return (
                        <div key={item._id} className="check-card">
                            <img src={`${server_url}/${item.Image}`} />
                            <p>{item.Name}</p>
                            <button onClick={() => { postAddExhibitInExposition(item) }}>ADD</button>
                            {/* <input type="checkbox" className="custom-checkbox" id="include"  /> */}
                            {/* <p>Age: {item.Age}</p>
                            <p>Description: {item.Description}</p> */}
                            <label htmlFor="include"></label>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ExhibitsAddList;
