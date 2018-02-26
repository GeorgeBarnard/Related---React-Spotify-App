import React, {Component} from 'react';
import Router from './Router'
import ReactDOM from 'react-dom'
import '../App.css';
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom'
import Call from './Call'
import OpenArtist from './OpenArtist'
import Player from './TrackPlayer'

import styled from 'styled-components';

class CubeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      backgroundImg: '',
      tracks: [
      {name:'',
        preview_url: 'url-not-found',
        artists: [ {name:''} ]
      }
      ],
      artists: [],
      history: []
    }
    this.openCard = this.openCard.bind(this)
  }

  updateList(tracks) {

    var newArray = this.state.history.slice();
        newArray.push(tracks);
        this.setState({artists: tracks, history:newArray})

        this.backButton()

  }

  backButton(){
    if(this.state.history.length >= 2){
      ReactDOM.findDOMNode(this).getElementsByClassName('backButton')[0].style.display = 'block'
    } else{
      ReactDOM.findDOMNode(this).getElementsByClassName('backButton')[0].style.display = 'none'
    }
  }

  goBack(){
    console.log('back')
    var history = this.state.history
    if(history.length >= 2){
      this.setState({
      artists: history[history.length - 2]
    })
    if(history.length == 2){
      ReactDOM.findDOMNode(this).getElementsByClassName('backButton')[0].style.display = 'none'
    }
    this.setHistory()
   }
   else{
     console.log('no-history')
   }
  }

  setHistory(){
      var history = this.state.history
      console.log(history.length)
      if(history.length >= 2){
      var newHistory = history.slice(0, -1)
      console.log('changed')
      this.setState({
        history: newHistory
      })
    }
    else if(history.length == 1){
      console.log('no-history')
    }
  }

  openCard(currentItem) {
    // console.log(item, url, backgroundImg)
    // var currentObject = ReactDOM.findDOMNode(this).getElementsByClassName(item)[0]
    // var player = document.getElementsByClassName('playerControls')[0]
    // var buttonvar = 'button' + item;
    // console.log(buttonvar)
    // var button = ReactDOM.findDOMNode(this).getElementsByClassName(buttonvar)[0]

    this.setState({
      cardOpen: true,
      currentItem
    })


    // if ((currentObject).classList.contains('fullOpen')) {
    //   currentObject.classList.remove("fullOpen");
    //   player.classList.remove("playerVisible");
    //   button.classList.remove("buttonVisible");
    //   console.log('has class')
    //   this.setState({backgroundImg: ''})
    // } else {
    //   this.setState({backgroundImg})
    //   currentObject.classList.add("fullOpen");
    //   player.classList.add("playerVisible");
    //   button.classList.add("buttonVisible");
    //   console.log('no class')
    // }

    const URL = currentItem.href + '/top-tracks?country=GB';
    var accessToken = this.props.api.access_token

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(URL, myOptions).then(response => response.json()).then(json => {
      const tracks = json.tracks;
      this.setState({tracks});
      console.log(tracks)
    })

  }

  closeModal(){
    this.setState({
      cardOpen: false
    })
  }

  relatedArtists(artists) {

    const relatedURL = artists + '/related-artists';
    var accessToken = this.props.api.access_token

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(relatedURL, myOptions).then(response => response.json()).then(json => {
      const related = json.artists;
      var newArray = this.state.history.slice();
          newArray.push(related);
          this.setState({artists: related, history:newArray, cardOpen: false})
      console.log(this.state.history)
      this.backButton()
    })


  }

  render() {

    document.body.classList.toggle('noScroll', this.state.cardOpen)

    if(this.state.artists){
      var artists = this.state.artists.map((newitem) => {
        if (newitem.images[0] == undefined) {
          newitem.images[0] = {
            url: 'https://i.pinimg.com/originals/0b/10/01/0b100112b19c5c231b49fd09581b779e.jpg'
          }
        }
        return (
          <Cube key={newitem.id} onClick={() => this.openCard(newitem)} className={newitem.id}>
            <CubeImage src={newitem.images[0].url}></CubeImage>
            <CubeTitle className='titlediv'>
              <img src={newitem.images[0].url}></img>
              <p>{newitem.name}</p>
            </CubeTitle>
          </Cube>
        )
      })
    } else {
      console.log('empty artists')
    }

    var trackCheck = this.state.tracks ? this.state.tracks[0] : ''

    return (
      <CubeContainer scroll={this.state.cardOpen}>
        <OpenArtist
          toggle={this.state.cardOpen}
          close={() => this.closeModal()}
          currentItem={this.state.currentItem}
          relatedArtists={(current) => this.relatedArtists(current)}
          >
        </OpenArtist>
        <BackButton className='backButton' onClick={() => this.goBack()}>Back</BackButton>
        <Player
          trackName={trackCheck ? trackCheck.name : ''}
          artistName={trackCheck ? trackCheck.artists[0].name : ''}
          previewUrl={trackCheck ? trackCheck.preview_url : ''}
          open={this.state.cardOpen}
        />
        {artists}
        {/* <BackgroundImage src={this.state.backgroundImg}></BackgroundImage> */}
      </CubeContainer>
    );
  }
}

export default CubeList;

const CubeContainer = styled.section`
   display: flex;
   flex-wrap: wrap;
   margin-top: 90px;
   padding: 0 25px;
   box-sizing: border-box;
   overflow: ${props => props.scroll ? 'hidden' : 'scroll'};
   @media (max-width: 992px) {
      margin-top: 200px;
   }
`
const Cube = styled.section`
   width: 20%;
   height: 20vw;
   position: relative;
   perspective: 1000px;
   @media (max-width: 992px) {
    width: 50%; height: 50vw;
   }
`
const CubeTitle = styled.section`
   position: absolute;
   bottom: calc(10% + 15px);
   transform: rotate(-90deg);
   transform-origin: bottom left;
   left: calc(10% + 5px);
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

const CubeImage = styled.img`
   width: 90%;
   height: 90%;
   object-fit: cover;
   transition: ease-in-out 0.25s;
   transition-property: height;
   perspective: 1000px;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 15px;
`
const BackButton = styled.button`
   position: fixed;
   width: 75px;
   height: 75px;
   top: 70px;
   left: 20px;
   border: 0px;
   font-size: 1.3em;
   color: white;
   z-index: 99999;
   display: none;
   @media (max-width: 992px) {
     top: 7.5px;
     height: 35px;
     left: 9px
    }
`
const BackgroundImage = styled.img`
   position: fixed;
   top: 0;
   left: 0;
   object-fit: cover;
   opacity: 0.8;
   width: 100%;
   height: 100%;
   pointer-events: none;
`
