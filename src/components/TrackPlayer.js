import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'
import styled from 'styled-components';

class Player extends Component {

  render() {
    var props = this.props
    return (
      <TrackPlayer open={this.props.open}>
        <h3>Top Track</h3>
        <h2>{props.trackName}</h2>
        <h4>- {props.artistName}</h4>
        <ReactAudioPlayer src={props.previewUrl} controls style={{
          position: 'relative',
          zIndex: '9999'
        }}/>
      </TrackPlayer>
    );
  }

}

export default Player;


const Sizes = {
  desktop: (1100 + 'px'),
  laptop: (992 + 'px'),
  tablet: (768 + 'px'),
  phone: (564 + 'px'),
  xsPhone: (376 + 'px')
}

const TrackPlayer = styled.section`
position: fixed;
width: ${props => props.open ? '80%' : '100%'};
background-color: #fafafa;
top: ${props => props.open ? '0' : '105px'};
right: ${props => props.open ? '10%' : '0px'};
transform: translateY(${props => props.open ? 'calc(10vh - 5px)' : '0'});
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
  top: 0px;
  height: ${props => props.open ? '70px' : '50px'};
}
h3{
 display: none;
}
audio{
 display: inline-block;
 background-color: #fafafa;
 margin: 0 auto;
 width: 250px;
 @media (min-width: ${Sizes.tablet}) {
   width: 300px;
 }
 @media (min-width: ${Sizes.laptop}) {
   margin: initial;
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
    margin: 0 7.5px;
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

`
