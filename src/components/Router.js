import React, { Component } from 'react';
import { Switch, Route, match, Redirect } from 'react-router-dom'
import Main from './Main'
import LoginPage from './LoginPage'
import { CSSTransitionGroup } from 'react-transition-group'
import '../App.css'

class Router extends Component {
  constructor() {
    super();
     this.state = {
     }
  }

  render(){
   return(
     <section>
         <Route render={({ location }) => (
              <Switch key={location.key} location={location}>
                     <Route exact path='/dashboard' render={() => (<Main params={this.props.params} currentUser={this.props.currentUser} />) }/>
                     <Route  exact path='/' component={LoginPage} />
              </Switch>
         )}/>
     </section>
    )
  }
}

export default Router
