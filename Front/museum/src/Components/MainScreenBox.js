import React, { useState, useEffect } from 'react';
import '../CSS/mainscreen.css'

const MainScreenBox = (props) => {    
    return(
        <div className="background-image" style={{backgroundImage: `url(${props.image})`}}>
            <div className="block-header">
            {props.header}
            </div>            
            <div className="block-content" style={{marginTop: props.contenMarginTop}}>
            {props.content}
            </div>
        </div>);
};
// comments.find(item => item.id == UsersData.id).text
{/* <Cell key={user.id} before={<Avatar src={user.photo_50}/>}>{user.last_name} {user.first_name}</Cell> */}

export default MainScreenBox;
