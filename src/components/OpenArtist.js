import React, { Component } from 'react';
import styled from 'styled-components';
import Sizes from '../mediaqueries.js'

export default class OpenArtist extends Component {

  render() {
    var current = this.props.currentItem
    var genres
    //set max genres to display
    var truncated = current ? current.genres.slice(0,8) : ''
    current ?  genres = truncated.map(result => (
      <Genre key={result}>{result}</Genre>
    )) : ''

    return (
    <OpenOuter toggle={this.props.toggle}>
      <Inner>
        <section className='inner left'>
          <img src={current ? current.images[0].url : ''}></img>
        </section>
        <section className='inner right'>
          <Title>{current ? current.name : ''}</Title>
          <GenreSection>{current ? genres : ''}</GenreSection>
          <RelatedButton
            className={current ? 'button' + current.id : ''}
            onClick={() => this.props.relatedArtists(current ? current.href : '')}
            >
            Rel<span>ated</span>
          </RelatedButton>
        </section>
      </Inner>
      <BackgroundImage src={current ? current.images[0].url : ''}></BackgroundImage>
      <BackButton onClick={() => this.props.close()}>X</BackButton>
    </OpenOuter>
    );
  }
}

// Styled Components

// All Styled Components are Prefixed with 'Sty' for destinction in the Render



const OpenOuter = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10001;
  transform: translateY(${props => props.toggle ? '0' : '-120vh'});
  transition: ease-in-out 0.25s;
  top: 0;
  left: 0;
`
const Inner = styled.section`
  position: absolute;
  overflow: hidden;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background-color: white;
  border-radius: 20px;
  z-index: 99;
  display: flex;
  flex-wrap: wrap;
  padding-top: 65px;
  box-sizing: border-box;
  .inner{
    width: 100%;
    height: 50%;
    position: relative;
    box-sizing: border-box;
    @media (min-width: ${Sizes.laptop}) {
      width: 50%;
      height: auto;
    }
  }
  .left{
    background-color: #c6370b;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 0px;
    position: relative;
    @media (min-width: ${Sizes.laptop}) {
      padding: 65px;
      align-items: center;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  .right{
    background-color: white;
    text-align: left;
    padding: 10px;
    @media (min-width: ${Sizes.laptop}) {
      padding: 30px;
    }
  }
`
const Title = styled.h1`
  position: relative;
  margin: 0 0 10px 0;
  font-size: 2em;
  font-weight: 900;
  z-index: 99;
  max-width: 80%;
  @media (min-width: ${Sizes.laptop}) {
    margin: 0;
    font-size: 4em;
  }
`
const BackButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 50px;
  height: 50px;
  z-index: 99999;
  font-size: 2em;
  display: flex;
  justify-content: center;
  border: none;
  transition: 0.1s ease-in;
  background-color: rgb(255, 255, 255);
  &:hover{
    background-color: #bc3e00;
  }
  @media (min-width: ${Sizes.laptop}) {
    top: 30px;
    right: 30px;
  }
`

const RelatedButton = styled.button`
background-color: black;
border: none;
color: white;
font-size: 2em;
font-weight: 700;
width: 150px;
transition: 0.1s ease-in;
text-align: center;
&:hover{
  background-color: #252525;
}
@media (min-width: ${Sizes.laptop}) {
  font-size: 2em;
  width: 150px;
  height: 80px;
}
span{
  color: #bc3e00;
}
`

const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`
const GenreSection = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  p:nth-last-child(1){
    margin-bottom: 15px;
  }
`
const Genre = styled.p`
  color: white;
  font-size: 0.45em;
  font-style: italic;
  background-color: #bc3e00;
  padding: 5px;
  font-weight: 700;
  display: inline-block;
  margin: 2.5px;
  height: fit-content;
  @media (min-width: ${Sizes.laptop}) {
    margin: 10px 2.5px 5px;
    font-size: 0.6em;
  }
`
