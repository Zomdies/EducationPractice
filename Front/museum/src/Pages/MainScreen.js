import React, { useState, useEffect } from 'react';

import MainScreenBox from '../Components/MainScreenBox'
import LineLabels from '../Components/LineLabels'

import welcomImage from '../Image/Welcome.png'
import floor1Image from '../Image/Floor1.png'
import floor2Image from '../Image/Floor2.png'
import floor3Image from '../Image/Floor3.png'
import infoImage from '../Image/Info.png'
import mapImage from '../Image/Map.png'
import mapBgImage from '../Image/MapBg.png'
import about from '../MainStrings'

import '../CSS/mainscreen.css'

const MainScreen = (props) => {
  return (<>
    <MainScreenBox
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
    </MainScreenBox>
    <MainScreenBox
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
    </MainScreenBox>
    <MainScreenBox
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
    </MainScreenBox>
    <MainScreenBox
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
    </MainScreenBox>
    <MainScreenBox
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
    </MainScreenBox>
    <MainScreenBox
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
    </MainScreenBox>
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
