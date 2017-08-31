import React, { Component } from 'react';
import logo from '../logo.svg';
import Router from './Router'
import '../App.css';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
