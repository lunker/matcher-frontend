'use strict';

import React, {Component} from 'react';


class Membership extends Component {

  constructor(props){
    super(props);
    this.state={isLoggedIn: false};
  }

  componentDidMount(){
    this.setState({isLoggedIn: window.sessionStorage.getItem('matcher_login')});
  }

  render(){

    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        hi!
      </div>

    );

  }

}

export default Membership;
