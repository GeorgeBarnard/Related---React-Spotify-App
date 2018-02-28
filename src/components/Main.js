// Packages
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link, withRouter} from 'react-router-dom'
import '../App.css';
import styled from 'styled-components';
// Components
import CubeList from './CubeList'
import Logo from './AppLogo'



const searches = [
  'red',
  'green',
  'blue',
  'orange',
  'pink',
  'yellow',
  'cream',
  'purple',
  'black',
  'white'
]


class Call extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artist: [],
      tracks: [{
          preview_url: 'url-not-found',
          artists: [{name: ''}]
      }],
      related: []
    }
  }

  componentDidMount() {
    this.search()
  }

  search() {
    if(this.props.location.state){
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    var query = searches[Math.floor(Math.random() * searches.length)];
    const FETCH_URL = BASE_URL + 'q=' + query + '&type=artist&limit=20';
    const { authToken } = this.props.location.state.auth;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions).then(response => response.json()).then(json => {
      if(json.artists){
      const artists = json.artists.items;
      this.setState({artist: artists});
      this.refs.list.updateList(artists);
      console.log('success')
    } else {
      this.props.history.push('/')
    }
    })
  } else {
    this.props.history.push('/')
  }
  }

  render() {

    return (
      <StyContainer className = "container" >
        <StyLogoHeader>
          <Logo />
        </StyLogoHeader>
        <StyHeader>
          <StyGroupStyle className="input-group">
                    <StyInput
                       type="text"
                       onChange={event => {this.setState({query: event.target.value})}}
                       className="form-control"
                       placeholder="Search.."
                     />
          <StyInputButton onClick={() => this.search()} className="btn btn-default" type="button">Go</StyInputButton>
          </StyGroupStyle>
        </StyHeader>
        <CubeList ref = "list" tracklist = {this.state.tracks} api = {this.props.params} tracks = {this.state.artist} />
      </StyContainer>
  )}
}

export default withRouter(Call);


// Styled Components

// All Styled Components are Prefixed with 'Sty' for destinction in the Render

const StyContainer = styled.section`
  background-color: white;
`

const StyHeader = styled.section`
 background-color: rgb(33, 33, 33);
 height: 50px;
 justify-content: center;
 align-items: center;
 display: flex;
 width: 300px;
 position: fixed;
 top: 0px;
 left: 0px;
 z-index: 999;
 @media (max-width: 992px) {
  width: 100%;
  top: 50px;
}
`
const StyInput = styled.input`
 width: calc(80% - 20px);
 height: calc(100% - 20px);
 border: none;
 padding: 10px;
 background-color: rgb(36, 36, 36);
 color: white;
 font-size: 1.4em;
 position: absolute;
 left: 0px;
 top: 0px;
`
const StyInputButton = styled.button`
 height: 100%;
 width: 20%;
 border: 0px;
 background-color: #c6370b;
 font-size: 1.6em;
 color: white;
 position: absolute;
 right: 0px;
 top: 0px;
`
const StyGroupStyle = styled.section`
 width: 100%;
 height: 100%;
`
const StyLogoHeader = styled.section`
 background-color: rgba(255, 255, 255, 0.82);
 position: fixed;
 top: 0;
 width: 100%;
 height: 50px;
 z-index: 999;
`
