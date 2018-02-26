import React, { Component } from 'react';
import { Switch, Route, match, Redirect } from 'react-router-dom'
import Call from './Call'
import LoginPage from './LoginPage'
import { CSSTransitionGroup } from 'react-transition-group'
import '../anim.css'

class Router extends Component {
  constructor() {
  super();
   this.state = {

   }
}

  render(){

    return(
   <div>
       <Route render={({ location }) => (
            <Switch key={location.key} location={location}>
                   <Route exact path='/dashboard' render={() => (<Call params={this.props.params} currentUser={this.props.currentUser} />) }/>
                   <Route  exact path='/' component={LoginPage}/>
            </Switch>
       )}/>
   </div>
    )
  }
}

export default Router
