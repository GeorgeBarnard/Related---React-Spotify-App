import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'
import styled from 'styled-components';
import Sizes from '../mediaqueries.js'

export default class Player extends Component {

  render() {
    var props = this.props
    return (
      <StyTrackPlayer open={props.open}>
        <h3>Top Track</h3>
        <h2>{props.trackName}</h2>
        <h4>- {props.artistName}</h4>
        <ReactAudioPlayer autoPlay src={props.previewUrl} controls/>
      </StyTrackPlayer>
    );
  }
}

// Styled Components

// All Styled Components are Prefixed with 'Sty' for destinction in the Render

const StyTrackPlayer = styled.section`
position: fixed;
width: ${props => props.open ? '80%' : '100%'};
background-color: #fafafa;
top: ${props => props.open ? '10%' : '105px'};
right: ${props => props.open ? '10%' : '0px'};
transform: none;
padding:  10px 5px 5px;
box-sizing: border-box;
height: auto;
transition: 0.25s ease-in;
perspective: 1000px;
z-index: 99999;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
@media (min-width: ${Sizes.laptop}) {
  padding:  5px 30px;
  width: ${props => props.open ? '80%' : 'calc(100% - 540px)'};
  transform: translateY(${props => props.open ? 'calc(10vh - 5px)' : '0'});
  top: 0px;
  height: ${props => props.open ? '70px' : '50px'};
  right: ${props => props.open ? '10%' : '240px'};
}
h3{
 display: none;
}
audio{
 display: inline-block;
 background-color: #fafafa;
 margin: 0 auto;
 width: 85%;
 padding: 0 7.5%;
 position: relative;
 z-index: 9999;
 @media (min-width: ${Sizes.laptop}) {
   width: 300px;
   padding: 0;
   margin: initial;
 }
}
h2,
h4{
 display: inline-block;
 margin: 2px;
 @media (min-width: ${Sizes.laptop}) {
   margin: 0 5px;
 }
}
h2{
 font-size: 0.6em;
 @media (min-width: ${Sizes.laptop}) {
   font-size: 1em;
 }
}
h4{
  font-size: 0.8em;
   @media (min-width: ${Sizes.laptop}) {
    font-size: 1.3em;
    margin: 0 15px;
   }
}


`
