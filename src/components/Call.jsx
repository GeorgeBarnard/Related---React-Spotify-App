import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link, withRouter} from 'react-router-dom'
import Audio from 'react-audioplayer';
import Request from 'superagent'
import _ from 'lodash'
import '../App.css';
import CubeList from './CubeList'
import Menu from './Menu'


import styled from 'styled-components';


class Call extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "eagle", // my query
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
      related: []
    }
  }

  componentDidMount() {
    this.setState({query: 'green'})
    console.log(this.state.query)
    this.search()
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=20';
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
      this.props.history.push('/auth')
    }
    })
  }

  render() {

    return (
     <Container className = "container" >
       <LogoHeader>
         <Menu />
         <h1 className="logo">Rel<span>ated</span>.</h1>
       </LogoHeader>
       <Header>
        <GroupStyle className="input-group">
          <Input type="text" onChange={event => {
            this.setState({query: event.target.value})
          }} className="form-control" placeholder="Search.."/>
          <InputButton onClick={() => this.search()} className="btn btn-default" type="button">Go</InputButton>
      </GroupStyle>
      </Header>
      <CubeList ref = "list" tracklist = {this.state.tracks} api = {this.props.params} tracks = {this.state.artist} />
  </Container>
  )}
}

export default withRouter(Call);


// Styled Components

const Container = styled.section`
  background-color: white;
`

const Header = styled.section`
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
const Input = styled.input`
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
const InputButton = styled.button`
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
const GroupStyle = styled.section`
 width: 100%;
 height: 100%;
`
const LogoHeader = styled.section`
 background-color: rgba(255, 255, 255, 0.82);
 position: fixed;
 top: 0;
 width: 100%;
 height: 50px;
 z-index: 999;
`
