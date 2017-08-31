import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import ReactAudioPlayer from 'react-audio-player'
import Audio from 'react-audioplayer';
import Request                  from 'superagent'
import _                        from 'lodash'
import '../App.css';

class Call extends Component {

  constructor(props) {
    super(props);
     this.state = {
       query: "fire", // my query
       artist: [],
      tracks: [{
        preview_url: 'url-not-found',
        artists:[{
          name: ''
        }]
      }],
      related: [],
      api: 'BQCcJLJqUc9MUtxo_83YZyE3yfKEkV2mGfyQPdt_hj5nLDxmNyB56yFcP2rVxZ2aPbzOGR-p8F4eHXQtftLibywNY3KEQt1sFDCNUDSmcXd5rofN6wH0zRm1hwKF5HXGScGX1LWIwnztaUAINAdrXOxGKZT5f0D3mEE&refresh_token=AQCxDLqa_Mnze3URO8PYNcK6IrvQ7t90URtxANZe191JaecaAJtSgSwoNbXsf072K-Kb6Iq43jBGYK82fCX9zK-drVY2XsBTVnOSujxMFmIaWWccz6_1mCPhlGfGiDWiexo'
     }
     this.openCard = this.openCard.bind(this)

   }

   componentDidMount(){
     this.setState({
       query: 'green'
     })
     console.log(this.state.query)
     this.search()
   }

   search() {
     console.log('this.state', this.state);
     const BASE_URL = 'https://api.spotify.com/v1/search?';
     const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=20';
     var accessToken = this.state.api

     var myOptions = {
       method: 'GET',
       headers: {
         'Authorization': 'Bearer ' + accessToken
       },
       mode: 'cors',
       cache: 'default'
     };

     fetch(FETCH_URL, myOptions)
       .then(response => response.json())
       .then(json => {
         const artists = json.artists.items;
         this.setState({ artist: artists });
         console.log(artists)
       })

   }

   relatedArtists(artists){
     console.log(artists)

     const relatedURL = artists + '/related-artists';
     var accessToken = this.state.api

     var myOptions = {
       method: 'GET',
       headers: {
         'Authorization': 'Bearer ' + accessToken
       },
       mode: 'cors',
       cache: 'default'
     };

     fetch(relatedURL, myOptions)
       .then(response => response.json())
       .then(json => {
         const related = json.artists;
         this.setState({ artist: related });
       })
   }

   openCard(item, url){
    console.log(item)
    var currentObject = ReactDOM.findDOMNode(this).getElementsByClassName(item)[0]
    var player = ReactDOM.findDOMNode(this).getElementsByClassName('playerControls')[0]

      if( (currentObject).classList.contains('fullOpen') ){
        currentObject.classList.remove("fullOpen");
        player.classList.remove("playerVisible");
        console.log('has class')
      } else{
          currentObject.classList.add("fullOpen");
          player.classList.add("playerVisible");
          console.log('no class')
      }

      const URL = url + '/top-tracks?country=GB';
      var accessToken = this.state.api

      var myOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        mode: 'cors',
        cache: 'default'
      };


      fetch(URL, myOptions)
        .then(response => response.json())
        .then(json => {
          const tracks = json.tracks;
          this.setState({ tracks });
          console.log(tracks)
        })

   }

   render() {
    var header ={
      backgroundColor: 'rgb(33, 33, 33)',
      height: '50px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      width: '300px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999
    }
    var cubeContainer ={
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 50
    }
    var cube ={
      width: '20vw',
      height: '20vw',
      position: 'relative',
      perspective: '1000px'

    }
    var cubeTitle ={
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
    var cubeImage ={
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'ease-in-out 0.05s',
      perspective: '1000px'
    }
console.log(this.state.artist)
     return (

       // return JSX
       <div className="container">
        <div className="playerControls">
          <h3>Top Track</h3>
          <h2>{this.state.tracks[0].name}</h2>
          <h4>- {this.state.tracks[0].artists[0].name}</h4>

         <ReactAudioPlayer
            autoPlay
            src={this.state.tracks[0].preview_url}
            controls
            style={{position: 'relative', zIndex: '9999'}}
          />
        </div>
         <div style={header}>
           <div className="input-group">
             <input type="text"
               onChange={event => { this.setState({ query: event.target.value }) }}
             className="form-control" placeholder="Search for..." />
             <span className="input-group-btn">
               <button
               onClick={()=> this.search()}
                className="btn btn-default" type="button">Go!</button>
             </span>
           </div>
         </div>
         <div style={cubeContainer}>
           {console.log(this.state.artist)}
           {this.state.artist.map((newitem) => {
             if (newitem.images[0] == undefined){
                    newitem.images[0] = {url: 'https://i.pinimg.com/originals/0b/10/01/0b100112b19c5c231b49fd09581b779e.jpg'}
                  }
            return (
              <div key={newitem.name} onClick={() => this.openCard(newitem.id, newitem.href)} className={newitem.id} style={cube}>
                <img style={cubeImage} src={newitem.images[0].url}></img>
                <button onClick={()=> this.relatedArtists(newitem.href)}>Related</button>
                <h1 style={cubeTitle}>{newitem.name}</h1>

              </div>
            )
          })}
         </div>


         </div>
     )
   }
 }

export default Call;
