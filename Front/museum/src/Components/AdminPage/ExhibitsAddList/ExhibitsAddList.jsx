import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import DismissOutline from '../../../Icons/dismiss_substract'
import SearchOutline from '../../../Icons/search_outline'

import defImage from '../../../Image/nophoto.png'

import './Css/ExhibitsAddList.css'
import { GetExhibitNotExposition, ResetStoreExhibit, SetExhibit } from '../../../Redux/actions';
import { server_url } from '../../../config';
import { Loader } from '../..';

const ExhibitsAddList = (props) => {
    const { exposition } = props
    const { setActivePopOut } = props
    const { token } = props

    const dispatch = useDispatch();
    const { items, loading } = useSelector(({ exhibit, app }) => {
        // console.log(exhibit);
        return {
            items: exhibit.items,
            loading: app.loading
        }
    });

    const [searchFilter, setSearchFilter] = useState(null)

    useEffect(() => {
        // dispatch(GetExhibitNotExposition(exposition._id));
        fetch(`${server_url}/exhibit`)
            .then(res => res.json())
            .then(response => {
                dispatch(SetExhibit(response.result.filter(item => item.Exposition.ID_Exposition === null || item.Exposition.ID_Exposition === exposition._id)));
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const searchChange = (e) => {
        const inp = document.getElementById("searchInp")
        if (inp.value.trim().length == 0) setSearchFilter(null)
        else setSearchFilter(inp.value)
    }

    const postAddExhibitInExposition = (item, remove = false) => {
        fetch(`${server_url}/exhibit`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: item._id,
                ID_Exposition: remove ? null : exposition._id,
                token: token
            })
        })
            .then(res => {
                switch (res.status) {
                    case 200:
                        fetch(`${server_url}/exhibit`)
                            .then(res => res.json())
                            .then(response => {
                                dispatch(SetExhibit(response.result.filter(item => item.Exposition.ID_Exposition === null || item.Exposition.ID_Exposition === exposition._id)));
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        // res.json().then(result => {
                        //     console.log(result);
                        //     dispatch(GetExhibitNotExposition(exposition._id));
                        // })
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

    const serching = (item) => {
        if (searchFilter === null) return (item);
        if (item.Name.toLowerCase().includes(searchFilter.toLowerCase())) return (item)
    }

    return (
        <div className="list-container">
            <div id="top-line" className="flex-row y-center">
                Exhibits
                <DismissOutline onClick={() => { setActivePopOut(null); dispatch(ResetStoreExhibit()); }} />
            </div>
            <div id="search">
                <div id="icon"><SearchOutline color="#323232" /></div>
                <input id="searchInp" type="text" className="input" placeholder="Search" onChange={searchChange} />
            </div>
            {loading && <Loader></Loader>}
            <div className="exhibts-container">
                {items.filter(serching).map(item => {
                    const included = item.Exposition.ID_Exposition === exposition._id;
                    const buttonText = included ? "REMOVE" : "ADD";
                    return (
                        <div key={item._id} className={`check-card ${included ? "included" : ""}`}>
                            <img src={`${server_url}/${item.Image}`} />
                            <p>{item.Name}</p>
                            <button onClick={() => { postAddExhibitInExposition(item, included) }}>{buttonText}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ExhibitsAddList;
