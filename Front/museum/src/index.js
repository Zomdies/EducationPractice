import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import styles from './CSS/mainscreen.css';
import './CSS/mainscreen.css'
import welcomImage from './Image/Welcome.png'
import floor1Image from './Image/Floor1.png'
import floor2Image from './Image/Floor2.png'
import floor3Image from './Image/Floor3.png'
import infoImage from './Image/Info.png'
import mapImage from './Image/Map.png'
import MainScreenBox from './Components/MainScreenBox'
import LineLabels from './Components/LineLabels'


ReactDOM.render(
  <React.StrictMode >
    <MainScreenBox 
      image={welcomImage} 
      contenMarginTop={250}
      header=
      {
        <p>
        WELCOM<br/>To the Museum
        </p> 
      } 
      content=
      {
        <p>
        Here you will find<br/>A lot of interesting<br/>Things.
        </p>
      }      
    >               
    </MainScreenBox>
    <MainScreenBox 
      image={floor1Image}
      header=
      {
        <p>
        HALLS<br/>On Floor 1
        </p> 
      }
      contenMarginTop={120}
    >      
    </MainScreenBox>
    <MainScreenBox 
      image={floor2Image}
      header=
      {
        <p>
        HALLS<br/>On Floor 2
        </p> 
      }
      contenMarginTop={120}
    >      
    </MainScreenBox>
    <MainScreenBox 
      image={floor3Image}
      header=
      {
        <p>
        HALLS<br/>On Floor 3
        </p> 
      }
      contenMarginTop={120}
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
    >      
    </MainScreenBox>
    <LineLabels 
      labels="WELCOME,FLOOR 1,FLOOR 2,FLOOR 3,INFORMATION" 
      labelSize="36px" 
      pageCount={5} 
      pageHeight={1280} 
      pageAlign="right"
      labelAlign="center"
    />    
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
