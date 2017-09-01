import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import Audio from 'react-audioplayer';
import Request from 'superagent'
import _ from 'lodash'
import '../App.css';
import CubeList from './CubeList'

class Call extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "fire", // my query
      artist: [],
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
      related: [],
      api: 'BQBttDwKqluc-TqWQ967wKHRUCzPm8VyzjjGIghi1v4R4kmVwn2k3XJD0wCrXm0VldCr7s4-S9HP4Mf0l80jF8N9D1Z1SnuQD2j1iALtISs3Cg53ZngYZ-q62zP8DFsXNPmgW98wLEk871OCLFxljhkDLBqiKhYoGkM&refresh_token=AQCG3VTglJjIOS-I1dlLNVHBMrNje8JaXaV5SI_xwa5YnTghzoN6UyMAWkEvCcKUCex7fatwjuudFmmvIwVxG2J9SCIYs46aS5ClZKrejjKP5jbb4RNgcFX0XOd3_QdajDk'
    }

  }

  componentDidMount() {
    this.setState({query: 'green'})
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

    fetch(FETCH_URL, myOptions).then(response => response.json()).then(json => {
      const artists = json.artists.items;
      this.setState({artist: artists});
      this.refs.list.updateList(artists);
    })

  }

  render() {
    var header = {
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
    var inputStyle ={
      width: 'calc(80% - 20px)',
      height: 'calc(100% - 20px)',
      border: 'none',
      padding: 10,
      backgroundColor: 'rgb(36, 36, 36)',
      color: 'white',
      fontSize: '1.4em',
      position: 'absolute',
      left: 0,
      top: 0
    }
    var inputButton ={
      height: '100%',
      width: '20%',
      border: 0,
      backgroundColor: '#c6370b',
      fontSize: '1.6em',
      color: 'white',
      position: 'absolute',
      right: 0,
      top: 0
    }
    var groupStyle ={
      width: '100%',
      height: '100%'
    }
    return (

     <div className = "container" >
         <h1 className="logo">Red<span>Player</span>.</h1>
        <div style={header}>
      <div style={groupStyle} className="input-group">
        <input style={inputStyle} type="text" onChange={event => {
          this.setState({query: event.target.value})
        }} className="form-control" placeholder="Search.."/>
          <button style={inputButton} onClick={() => this.search()} className="btn btn-default" type="button">Go</button>
      </div>
    </div>
    <CubeList ref = "list" tracklist = {
      this.state.tracks
    }
    api = {
      this.state.api
    }
    tracks = {
      this.state.artist
    } />
    </div>)
  }
}

export default Call;
