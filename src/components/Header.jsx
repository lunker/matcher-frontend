import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, List } from 'semantic-ui-react'
import axios from 'axios';
import history from '../pages/History';
import Config from '../Config';


class Header extends Component{
  constructor(props){
    super(props);

    if(sessionStorage.getItem('matcher_login') == null){
      sessionStorage.setItem('matcher_login', 'false');
    }
    this.state={isLoggedIn: sessionStorage.getItem('matcher_login')};
  }

  customLogin() {
    axios({
      method:'get',
      url:'https://localhost/oauth/authorize'
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  createKakaoLogin() {
    var self=this;
    try {
      Kakao.init(Config.kakao);
    }
    catch(e){
      console.log('Already initialized');
    }

    // 카카오 로그인 버튼을 생성합니다.
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        console.log(authObj);
        var postData= {
          "accessToken": authObj.access_token,
          "expiresIn": authObj.expires_in,
          "refreshToken": authObj.refresh_token
        };

        sessionStorage.setItem('matcher_token', authObj.access_token);

        // register kakao access_token
        axios({
          method:'post',
          url: 'http://localhost:8080/api/auth/kakao/token',
          data: postData,
          headers: {'Access-Control-Allow-Origin' : '*'}
        })
        .then((response) => {
          console.log(response);

          sessionStorage.setItem("matcher_login", true);
          self.setState({isLoggedIn: 'true'});

          let token=sessionStorage.getItem('matcher_token');

          // Get kakao user id
          axios.get('http://localhost:8080/api/auth/kakao/user?token=' + token, {
            headers: {
              'Access-Control-Allow-Origin' : '*'
            }
          })
          .then((response)=>{
            console.log(response);

            sessionStorage.setItem('matcher_kakao_user_id', response.data.id);
          })
          .catch((error)=>{
            console.log(error);
          });
          // end http
        })
        .catch(error => {
          console.log(error);
          self.setState({isLoggedIn: 'false'});
        });
      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    }); // end create login button
  }// end method

  logout(){
    console.log('logout!')
    sessionStorage.setItem("matcher_login", 'false');
    this.setState({isLoggedIn:'false'});
  }


  // -- React Lifecycle
  componentDidMount() {
    console.log('componentDidMount');
    console.log('is loggedin : ' + sessionStorage.getItem('matcher_login'));
    this.setState({isLoggedIn: sessionStorage.getItem('matcher_login')});

    if(sessionStorage.getItem('matcher_login') == "false"){
      console.log("Create kakao login button")
      this.createKakaoLogin();
    }
    else {
      console.log("Already loggedIn")
    }
  }// end method

  shouldComponentUpdate(nextProps, nextState){
    console.log('ASDFASFSAA');
    console.log(this.state.isLoggedIn);
    console.log(nextState.isLoggedIn);
    return (this.state.isLoggedIn != nextState.isLoggedIn);
  }

  componentDidUpdate(prevProps, prevState){
    if(sessionStorage.getItem('matcher_login') == "false"){
      console.log("Create kakao login button")
      this.createKakaoLogin();
    }
  }

  render() {
    console.log('render');

    const isLoggedIn = sessionStorage.getItem('matcher_login');
    let user=null;

    if(isLoggedIn == 'true'){
      user = <a onClick={this.logout.bind(this)}>Logout!</a>;
    }
    else {
      user = <a id="kakao-login-btn"></a>
    }

    return (
      <div>
        <List horizontal>
          <List.Item>
            <List.Content>
              <Link to="/">Home</Link>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <Link to="/register">Register</Link>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <a onClick={this.customLogin.bind(this)}>custom login</a>;
            </List.Content>
          </List.Item>

          {
            this.state.isLoggedIn == 'true'? (
              <List.Item>
                <List.Content>
                  <a onClick={this.logout.bind(this)}>Logout!</a>;
                </List.Content>
              </List.Item>
            ) : (
              <List.Item>
                <List.Content>
                  <a id="kakao-login-btn"></a>
                </List.Content>
              </List.Item>
            )
          }

        </List>
        <hr/>
      </div>
    );
  }
}

export default Header;
