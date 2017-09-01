import React, {Component} from 'react';
import Router from './Router'
import ReactDOM from 'react-dom'
import ReactAudioPlayer from 'react-audio-player'
import '../App.css';
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom'
import Call from './Call'

class CubeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {
          preview_url: 'url-not-found',
          artists: [
            {
              name: ''
            }
          ]
        }
      ],
      artists: []
    }

    this.openCard = this.openCard.bind(this)
  }
  updateList(tracks) {
    this.setState({artists: tracks})
  }

  openCard(item, url) {
    console.log(item)
    var currentObject = ReactDOM.findDOMNode(this).getElementsByClassName(item)[0]
    var player = document.getElementsByClassName('playerControls')[0]
    var buttonvar = 'button' + item;
    console.log(buttonvar)
    var button = ReactDOM.findDOMNode(this).getElementsByClassName(buttonvar)[0]

    if ((currentObject).classList.contains('fullOpen')) {
      currentObject.classList.remove("fullOpen");
      player.classList.remove("playerVisible");
      button.classList.add("buttonVisible");
      console.log('has class')
    } else {
      currentObject.classList.add("fullOpen");
      player.classList.add("playerVisible");
      button.classList.add("buttonVisible");
      console.log('no class')
    }

    const URL = url + '/top-tracks?country=GB';
    var accessToken = this.props.api

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

  relatedArtists(artists) {
    console.log(artists)

    const relatedURL = artists + '/related-artists';
    var accessToken = this.props.api

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
      this.setState({artists: related});
      console.log(related)
    })
  }

  render() {
    var cubeContainer = {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 50
    }
    var cube = {
      width: '20vw',
      height: '20vw',
      position: 'relative',
      perspective: '1000px'

    }
    var cubeTitle = {
      position: 'absolute',
      bottom: '-10px',
      transform: 'rotate(-90deg)',
      transformOrigin: 'left',
      left: 30,
      backgroundColor: '#fafafa',
      padding: '5px',
      fontSize: '1em',
      transition: '0.2s ease-in',
      zIndex: '100',
      perspective: '1000px'
    }
    var cubeImage = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'ease-in-out 0.05s',
      perspective: '1000px'
    }
    return (
      <div style={cubeContainer}>
        <div className="playerControls">
          <h3>Top Track</h3>
          <h2>{this.state.tracks[0].name}</h2>
          <h4>- {this.state.tracks[0].artists[0].name}</h4>
          <ReactAudioPlayer autoPlay src={this.state.tracks[0].preview_url} controls style={{
            position: 'relative',
            zIndex: '9999'
          }}/>
        </div>
        {this.state.artists.map((newitem) => {
          if (newitem.images[0] == undefined) {
            newitem.images[0] = {
              url: 'https://i.pinimg.com/originals/0b/10/01/0b100112b19c5c231b49fd09581b779e.jpg'
            }
          }
          return (
            <div key={newitem.name} onClick={() => this.openCard(newitem.id, newitem.href)} className={newitem.id} style={cube}>
              <img style={cubeImage} src={newitem.images[0].url}></img>
              <button className={'relatedButton button' + newitem.id} onClick={() => this.relatedArtists(newitem.href)}>Related</button>
              <h1 style={cubeTitle}>{newitem.name}</h1>
            </div>
          )
        })}
      </div>
    );
  }
}

export default CubeList;
