import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Header} from './containers';
import { Route } from 'react-router-dom';
import { Home, Project} from './pages';


class App extends Component{
  render(){
    return(
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/project" component={Project} />
      </div>
    );
  }
}

export default App;
