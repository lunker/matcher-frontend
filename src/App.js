import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './containers';
import { Route, Switch} from 'react-router-dom';
import * as pages  from './pages';
import {Register} from './pages';


class App extends Component{
  render(props){
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={pages.Home} />
          <Route exact path="/project" component={pages.Project} />
          <Route exact path="/register" render={(props) => (<Register {...props}/>)} />
          <Route component={pages.Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
