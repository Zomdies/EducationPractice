import React, { useState, useEffect } from 'react';

import {InformationBox,LineLabels} from '../Components'

import welcomImage from '../Image/Welcome.png'
import floor1Image from '../Image/Floor1.png'
import floor2Image from '../Image/Floor2.png'
import floor3Image from '../Image/Floor3.png'
import infoImage from '../Image/Info.png'
import mapImage from '../Image/Map.png'
import mapBgImage from '../Image/MapBg.png'


import '../Css/Pages/HomePage.css'

const about="Ricardo, Obama, Bonk, JoJo. Once upon a time, four memes lived in peace. But soon the Bonk meme started a war. Only the admin-the master of all four memes, could stop the invaders. But when the world needed him most – he ate and fell asleep. It took 10 hours and my brother and I found a new admin in the public – users named Aang. Although his skill as a public admin was great, he still had a lot to learn… But I believed that the user would save the world!"


const MainScreen = (props) => {
  return (
    <>
      <InformationBox
        image={welcomImage}
        contenMarginTop={250}
        header=
        {
          <p>
            WELCOME<br />To the Museum
        </p>
        }
        content=
        {
          <p>
            Here you will find<br />A lot of interesting<br />Things.
        </p>
        }
      >
      </InformationBox>
      <InformationBox
        image={floor1Image}
        header=
        {
          <p>
            HALLS<br />On Floor 1
        </p>
        }
        contenMarginTop={220}
        content=
        {
          <div className="floor-box">
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 1,
              gridColumnEnd: 5,
            }}><p>Hall 1</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 5,
              gridColumnEnd: 8,
            }}><p>Hall 2</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 8,
              gridColumnEnd: 11,
            }}><p>Hall 3</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 11,
              gridColumnEnd: 14,
            }}><p>Hall 4</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 5,
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}><p>Hall 5</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 1,
              gridColumnEnd: 4,
            }}><p>Hall 6</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 5,
              gridColumnStart: 7,
              gridColumnEnd: 11,
            }}><p>Hall 7</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 8,
              gridColumnEnd: 11,
            }}><p>Hall 8</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 7,
              gridColumnStart: 11,
              gridColumnEnd: 14,
            }}><p>Hall 9</p></div>
          </div>
        }
      >
      </InformationBox>
      <InformationBox
        image={floor2Image}
        header=
        {
          <p>
            HALLS<br />On Floor 2
        </p>
        }
        contenMarginTop={220}
        content=
        {
          <div className="floor-box">
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 5,
              gridColumnStart: 1,
              gridColumnEnd: 5,
            }}><p>Hall 1</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 5,
              gridColumnEnd: 8,
            }}><p>Hall 2</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 8,
              gridColumnEnd: 12,
            }}><p>Hall 3</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 5,
              gridColumnStart: 12,
              gridColumnEnd: 14,
            }}><p>Hall 4</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 5,
              gridColumnStart: 7,
              gridColumnEnd: 10,
            }}><p>Hall 5</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 1,
              gridColumnEnd: 4,
            }}><p>Hall 6</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 5,
              gridColumnStart: 10,
              gridColumnEnd: 12,
            }}><p>Hall 7</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 8,
              gridColumnEnd: 11,
            }}><p>Hall 8</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 11,
              gridColumnEnd: 14,
            }}><p>Hall 9</p></div>
          </div>
        }
      >
      </InformationBox>
      <InformationBox
        image={floor3Image}
        header=
        {
          <p>
            HALLS<br />On Floor 3
        </p>
        }
        contenMarginTop={220}
        content=
        {
          <div className="floor-box">
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 7,
              gridColumnStart: 1,
              gridColumnEnd: 5,
            }}><p>Hall 1</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 5,
              gridColumnStart: 7,
              gridColumnEnd: 10,
            }}><p>Hall 2</p></div>
            <div className="hall" style={{
              gridRowStart: 1,
              gridRowEnd: 3,
              gridColumnStart: 10,
              gridColumnEnd: 14,
            }}><p>Hall 3</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 5,
              gridColumnStart: 10,
              gridColumnEnd: 12,
            }}><p>Hall 4</p></div>
            <div className="hall" style={{
              gridRowStart: 3,
              gridRowEnd: 7,
              gridColumnStart: 12,
              gridColumnEnd: 14,
            }}><p>Hall 5</p></div>
            <div className="hall" style={{
              gridRowStart: 5,
              gridRowEnd: 7,
              gridColumnStart: 8,
              gridColumnEnd: 12,
            }}><p>Hall 6</p></div>
          </div>
        }
      >
      </InformationBox>
      <InformationBox
        image={infoImage}
        header=
        {
          <p>
            ABOUT
        </p>
        }
        contenMarginTop={120}
        content=
        {
          <div className="about">
            {about}
          </div>
        }
      >
      </InformationBox>
      <InformationBox
        image={mapBgImage}
        header=
        {
          <p>
            MAP
        </p>
        }
        contenMarginTop={120}
        content=
        {
          <img src={mapImage} width={675} />
        }
      >
      </InformationBox>
      <LineLabels
        labels="WELCOME,FLOOR 1,FLOOR 2,FLOOR 3,INFORMATION,MAP"
        labelSize="36px"
        pageCount={5}
        pageHeight={1080}
        pageAlign="right"
        labelAlign="center"
      />
    </>);
};
// comments.find(item => item.id == UsersData.id).text
{/* <Cell key={user.id} before={<Avatar src={user.photo_50}/>}>{user.last_name} {user.first_name}</Cell> */ }

export default MainScreen;
