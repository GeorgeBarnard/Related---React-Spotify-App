import React, { Component } from 'react';
import Router from './Router'
import '../App.css';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      params,
      loggedIn: params.access_token ? true : false
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">
        <Router params={this.state.params} />
      </div>
    );
  }
}

export default App;
