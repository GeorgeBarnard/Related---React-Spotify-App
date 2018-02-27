import React, { Component } from "react";
import jsonp from "jsonp";
import axios from "axios";
import styled from 'styled-components';
import {
  spotifyWebApiURL,
  clientID,
  redirectURI,
  clientSecret,
  spotifyProfileURL
} from "../constants";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "React Spotify",
      authToken: "",
      authorized: false,
      profile: []
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized });
    }

    document.querySelector('.enterButton').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft - 130
      const y = e.pageY - e.target.offsetTop - 100
      e.target.style.setProperty('--x', `${ x }px`)
      e.target.style.setProperty('--y', `${ y }px`)
    }
  };

  handleAuthFlow = event => {
    event.preventDefault();

    if (this.state.authorized) {
      const { authToken } = this.state;
      let user;
      axios
        .get(spotifyProfileURL + authToken)
        .then(response => {
            this.setState({ profile: response.data });
            user = response.data;
        })
        .then(() => this.props.history.push('/Dashboard', { current_user: { user }, auth: { authToken } } ) )
        .catch(error => {
            console.log(error);
            window.location.assign(spotifyWebApiURL);
        });
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  };

  render() {
    return (
      <Outer>
        <img src='https://fthmb.tqn.com/Agvw-fju3u01_-lDQeJA01yh_Tw=/1280x868/filters:no_upscale():fill(transparent,1)/3314066569_8fd2f35b5e_o-56a68f1e3df78cf7728efac5.jpg'></img>
      <Inner>
        <section className='inner'>
            <h1>Welcome to<br/><span className='start'>Rel<span className='end'>ated</span></span></h1>
            <p className="display-5">
              {this.state.authorized
                ? "Successfully authorized! Click below to Enter!"
                : "Just click the button below to authorize your Spotify account to start using React Spotify!"}
            </p>
            <button
              type="button"
              className="enterButton"
              onClick={this.handleAuthFlow}
            >
              <span>{this.state.authorized
                ? "Proceed to React Spotify"
                : "Sign in with Spotify"}</span>
            </button>
              <a href='https://george-barnard.com' className='github'>
              <p>Or view this project on GitHub <svg viewBox="0 0 128 128">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                </svg>
              </p>
            </a>
        </section>
      </Inner>
      </Outer>
    );
  }
}

const Sizes = {
  desktop: (1100 + 'px'),
  laptop: (992 + 'px'),
  tablet: (768 + 'px'),
  phone: (564 + 'px'),
  xsPhone: (374 + 'px')
}

const Outer = styled.section`

  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Inner = styled.section`
  padding: 30px;
  box-sizing: border-box;
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1{
    font-size: 1.1em;
    margin-bottom: 10px;
    @media (min-width: ${Sizes.xsPhone}) {
      font-size: 1.4em;
    }
    @media (min-width: ${Sizes.tablet}) {
      font-size: 2.5em;
    }
    .start{
      font-size: 3em;
      color: #c6370b;
    }
    .end{
      color: black;
    }
  }
  .enterButton {
    margin: 20px auto;
    position: relative;
   appearance: none;
   background: #c6370b;
   padding: 1em 2em;
   border: none;
   color: white;
   font-size: 1em;
   cursor: pointer;
   outline: none;
   overflow: hidden;
   border-radius: 100px;
   @media (min-width: ${Sizes.laptop}) {
     font-size: 2em;
   }

   span {
       position: relative;
       pointer-events: none;
   }

   &::before {
       --size: 0;
       content: '';
       position: absolute;
       left: var(--x);
       top: var(--y);
       width: var(--size);
       height: var(--size);
       background: radial-gradient(circle closest-side,#1eb11b,transparent);
       transform: translate(-50%, -50%);
       transition: width .2s ease, height .2s ease;
   }

   &:hover::before {
       --size: 400px;
   }
  }
   .github{
     color: black;
     p{
       max-width: 80%;
       margin: 0 auto;
       display: flex;
       justify-content: center;
       align-items: center;
     }
     svg{
       width: 30px;
       margin: -2px 10px 0;
     }
   }
`
//   render() {
//     return (
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="display-4">
//               {this.state.value}
//               <small className="text-muted">
//                 {" "}
//                 a react app connected to the Spotify Web API{" "}
//               </small>
//             </h3>
//             <hr className="my-4" />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-12">
//             <p className="display-5">
//               {this.state.authorized
//                 ? "Successfully authorized! Click below to Enter!"
//                 : "Just click the button below to authorize your Spotify account to start using React Spotify!"}
//             </p>
//             <button
//               type="button"
//               className="btn btn-outline-success"
//               onClick={this.handleAuthFlow}
//             >
//               {this.state.authorized
//                 ? "Proceed to React Spotify"
//                 : "Sign in with Spotify"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }




// import React, { Component } from 'react';
// import { Switch, Route, match, Redirect } from 'react-router-dom'
// import Call from './Call'
// import { CSSTransitionGroup } from 'react-transition-group'
// import '../anim.css'
//
// class LoginPage extends Component {
//   constructor() {
//   super();
//    this.state = {
//
//    }
//  }
//
//   render(){
//
//     return(
//    <div>
//       <a href='http://localhost:8888'><h1>Login</h1></a>
//    </div>
//     )
//   }
// }
//
//
// export default LoginPage
