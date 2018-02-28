import React, { Component } from 'react';
import styled from 'styled-components';
import Sizes from '../mediaqueries.js'

export default class ArtistCube extends Component {

  render() {
    var item = this.props.item
    return (
      <StyCube key={item.id} onClick={() => this.props.openCard(item)} className={item.id}>
        <StyCubeImage src={item.images[0].url}></StyCubeImage>
        <StyCubeTitle className='titlediv'>
            <img src={item.images[0].url}></img>
            <p>{item.name}</p>
        </StyCubeTitle>
     </StyCube>
    );
  }
}

// Styled Components

// All Styled Components are Prefixed with 'Sty' for destinction in the Render

const StyCube = styled.section`
   cursor: pointer;
   width: 20%;
   height: 20vw;
   position: relative;
   overflow: hidden;
   perspective: 1000px;
   border-radius: 20px;
   transform: rotate(0.001deg);
   @media (max-width: 992px) {
    width: 50%; height: 50vw;
   }
   &:hover{
     img{
         transform: scale(1.02);
         transform-origin: center center;
        }
   }
`
const StyCubeTitle = styled.section`
   position: absolute;
   bottom: calc(10% + 15px);
   transform: rotate(-90deg);
   transform-origin: bottom left;
   left: calc(10% + 25px);
   background-color: white;
   font-weight: 900;
   padding: 5px;
   font-size: 1em;
   transition: 0.2s ease-in;
   z-index: 100;
   perspective: 1000px;
   background-size: cover;
   border-radius: 10px;
   overflow: hidden;
   @media (min-width: ${Sizes.tablet}) {
      left: calc(10% + 5px);
   }
   img{
     width: 3000%;
     position: absolute;
     top: 0;
     left: 0;
     z-index: -1;
   }
   p{
     margin: 0;
     padding: 2.5px 7.5px;
     background-color: rgba(255, 255, 255, 0.86);
     border-radius: 7.5px;
     color: rgb(42, 42, 42);
     @media (max-width: 565px) {
      font-size: 0.6em;
      }
   }
`

const StyCubeImage = styled.img`
   margin-top: 5%;
   width: 90%;
   height: 90%;
   transition: 0.15s ease-in-out;
   backface-visibility: hidden;
   object-fit: cover;
   perspective: 1000px;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 15px;
`
