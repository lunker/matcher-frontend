import React, {Component} from 'react';
import { Dropdown, Icon, Label } from 'semantic-ui-react'
import axios from 'axios';

// -- react-dates
import _ from 'lodash';
import update from 'immutability-helper';


class FBLoginButton extends Component {
  constructor(props){
    super(props);


  }

  componentDidMount(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          var accessToken = response.authResponse.accessToken;
          console.log('FB accessToken: ' + accessToken);
        }
      }
    );

  }

  render() {
    return(
      <div>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="true" data-auto-logout-link="true" data-use-continue-as="true">
        </div>
      </div>
    );
  }
}

export default FBLoginButton;
