import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components';
import { Route, Switch} from 'react-router-dom';
import * as pages  from './pages';
import {Register} from './pages';
import { MatcherContainer }from './containers';


class App extends Component{
  render(props){
    return(
      <div>
        <MatcherContainer>
          <Header />
          <Switch>
            <Route exact path="/" component={pages.Home} />
            <Route exact path="/project" component={pages.Project} />
            <Route exact path="/register" render={(props) => (<Register {...props}/>)} />
            <Route component={pages.Error} />
          </Switch>
        </MatcherContainer>
      </div>
    );
  }
}

export default App;
