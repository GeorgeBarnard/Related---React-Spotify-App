import React, { Component } from 'react';
import styled from 'styled-components';

export default class AppLogo extends Component {

  render() {
    return (
     <StyLogo>Rel<span>ated</span>.</StyLogo>
    );
  }

}

const StyLogo = styled.h1`
  position: fixed;
  margin: 0;
  top: 8px;
  right: 40px;
  z-index: 99999;
  font-size: 1.7em;
  color: #c6370b;
  span{
    color: rgb(31, 31, 31);
  }
`
