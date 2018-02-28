// Packages
import React, {Component} from 'react';
import Router from './Router'
import ReactDOM from 'react-dom'
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom'
import styled from 'styled-components';
import Sizes from '../mediaqueries.js'
import '../App.css';
// Components
import OpenArtist from './OpenArtist'
import Player from './TrackPlayer'
import ArtistCube from './ArtistCube'


export default class CubeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      backgroundImg: '',
      tracks: [{
        name:'',
        preview_url: 'url-not-found',
        artists: [ {name:''} ]
      }],
      artists: [],
      history: []
    }
  }

  updateList(tracks) {
    // Create Array of Previously Searched Artists
    var newArray = this.state.history.slice()
    newArray.push(tracks)
    this.setState({artists: tracks, history: newArray})
    this.showBack()
  }

  showBack(){
    // Hide or show back button if search history exists
    var Button = this.backButton
    this.state.history.length >= 2 ? Button.style.display = 'block' : Button.style.display = 'none'
  }

  goBack(){
    // Back button functionality
    var history = this.state.history
    history.length >= 2 ? (this.setState({ artists: history[history.length - 2]}), this.setHistory()) : console.log('no-history')
    history.length == 2 ? this.backButton.style.display = 'none' : ''
  }

  setHistory(){
    // Set history array
    var history = this.state.history
    var newHistory
    history.length >= 2 ? (
      newHistory = history.slice(0, -1),
      this.setState({
      history: newHistory
      })
    ) : history.length == 1 ?
    console.log('no-history') :
    ''
  }

  openCard(currentItem) {
    // Open full screen card

    const URL = currentItem.href + '/top-tracks?country=GB';
    var accessToken = this.props.api.access_token

    this.setState({
      cardOpen: true,
      currentItem
    })

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
    this.setState({cardOpen: false})
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
      this.showBack()
    })
  }

  render() {

    // Add NoScroll class to body when full screen is activated
    document.body.classList.toggle('noScroll', this.state.cardOpen)
    // Check that there are tracks for the audio player to play
    var trackCheck = this.state.tracks ? this.state.tracks[0] : ''
    var artists

    this.state.artists ? (
      artists = this.state.artists.map((newitem) => {
        newitem.images[0] == undefined ? (
          newitem.images[0] = { url: 'https://i.pinimg.com/originals/0b/10/01/0b100112b19c5c231b49fd09581b779e.jpg'}
        ) : ''
        return (
          <ArtistCube openCard={(item) => this.openCard(item)}  item={newitem} />
        )
      })
    ) : console.log('empty artists')

    return (
      <StyCubeContainer scroll={this.state.cardOpen}>
        <OpenArtist
          toggle={this.state.cardOpen}
          close={() => this.closeModal()}
          currentItem={this.state.currentItem}
          relatedArtists={(current) => this.relatedArtists(current)}
          >
        </OpenArtist>
        <StyBackButton innerRef={(button) => { this.backButton = button; }} className='backButton' onClick={() => this.goBack()}>Back</StyBackButton>
        <Player
          trackName={trackCheck ? trackCheck.name : ''}
          artistName={trackCheck ? trackCheck.artists[0].name : ''}
          previewUrl={trackCheck ? trackCheck.preview_url : ''}
          open={this.state.cardOpen}
        />
        {artists}
      </StyCubeContainer>
    );
  }
}

// Styled Components

// All Styled Components are Prefixed with 'Sty' for destinction in the Render

const StyCubeContainer = styled.section`
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

const StyBackButton = styled.button`
   position: fixed;
   width: 75px;
   height: 75px;
   top: 70px;
   left: 20px;
   border: 0px;
   font-size: 1.3em;
   color: white;
   background-color: #c6370b;
   z-index: 999;
   display: none;
   @media (max-width: 992px) {
     top: 7.5px;
     height: 35px;
     left: 9px
    }
`
const StyBackgroundImage = styled.img`
   position: fixed;
   top: 0;
   left: 0;
   object-fit: cover;
   opacity: 0.8;
   width: 100%;
   height: 100%;
   pointer-events: none;
`
