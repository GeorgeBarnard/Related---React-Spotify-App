import React, { Component } from 'react';
import { Switch, Route, match, Redirect } from 'react-router-dom'
import Call from './Call'
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
                  <Route exact path='/' render={() => (<Call currentUser={this.props.currentUser} />) }/>
                   <Route  exact path='/other' component={loginPage}/>
            </Switch>
       )}/>
   </div>
    )
  }
}

const loginPage = () => (
  <h3>HI</h3>
)


export default Router
