import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components';
import { Route, Switch, withRouter } from 'react-router-dom';
import {Register, Home, Error } from './pages';
import { MatcherContainer }from './containers';

class App extends Component{
  constructor(props){
    super(props);
  }

  render(props){
    /*
     router를 header와 같은 depth에 넣으면, withRouter가 올바르게 작동할 것이고, 그에 따라 active 활성화가 가능 할 듯
    */

    return(
      <div>
          <Switch>
            <MatcherContainer {...props}>
            <Route exact path="/" render={(props) => (<Home {...props}/>)} />
            <Route exact path="/register" render={(props) => (<Register {...props}/>)} />
            </MatcherContainer>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
