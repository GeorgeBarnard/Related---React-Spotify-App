import React, { Component } from 'react';
import logo from '../logo.svg';
import Router from './Router'
import '../App.css';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 30px; height: 30px; background-color: #c6370b; position: fixed; top: 10px; right: 20px; z-index: 99999;
`
const Menu = styled.button`
  padding: 0; margin: 2px 0; border: 0;
`

const DropDown = styled.section`
  width: 150px; transition: ease-in 0.2s;
  position: absolute; top: 50px; left: ${props => props.toggled ? '-120px' : '100px'};
  background-color: pink;
`
const MenuItem = styled.section`
  width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box;
  a{
    text-decoration: none;
  }
`

class App extends Component {
  constructor(){
    super();
    this.state = {
      toggled: false
    }
  }

  menuClick(){
    if(this.state.toggled){
      this.setState({toggled:false})
    } else {
      this.setState({toggled:true})
    }
  }

  render() {
    return (
    <MenuContainer>
      <Menu onClick={() => this.menuClick()}><i className="material-icons">menu</i></Menu>
        <DropDown toggled={this.state.toggled}>
          <MenuItem><Link to="/auth">Log In</Link></MenuItem>
          <MenuItem><Link to="/about">About</Link></MenuItem>
        </DropDown>
    </MenuContainer>
    );
  }
}

export default App;
