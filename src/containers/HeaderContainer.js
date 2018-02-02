import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import axios from 'axios';



class Header extends Component{
  constructor(props){
    super(props);
    this.state={view: 'no view'};
  }

  handleLogin() {
    console.log("login!")
    var self=this;

    axios.get('http://localhost:8080/api/auth/login', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
    .then((response)=>{
        console.log(response);

        // this.setState({view: response.data});
      }).catch((error)=>{
        console.log(error);
    });
  }




  listGransts() {
    axios.get('https://api.github.com/applications/grants').then((response)=>{
        console.log(response);
      }).catch((error)=>{
        console.log(error);
    });
  }

/*
  handleLogin() {

    axios.get('https://github.com/login/oauth/authorize?client_id=99c43ae2d5370cd235ab', {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:10000'
      }
    }).then((response)=>{
      console.log(response);

      this.setState({view: response.data});
    }).catch((error)=>{
      console.log(error);
    });
  }
  */

  render() {
    return (
      <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/project">Project</Link></li>
            <li><Button color="blue" onClick={this.handleLogin.bind(this)}>Login</Button></li>
            <li><Button color="blue" onClick={this.listGransts.bind(this)}>list grants</Button></li>
        </ul>
        <hr/>
        <div dangerouslySetInnerHTML={ {__html: this.state.view}} />
      </div>
    );
  }
}

export default Header;
