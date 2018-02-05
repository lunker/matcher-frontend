import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Button, List } from 'semantic-ui-react'
import axios from 'axios';
import history from '../pages/History';


class Header extends Component{
  constructor(props){
    super(props);
    if(sessionStorage.getItem('matcher_login') == null){
      sessionStorage.setItem('matcher_login', 'false');
    }
    this.state={isLoggedIn: sessionStorage.getItem('matcher_login')};
  }

  handleLogin() {
    var self=this;

    axios.get('https://kauth.kakao.com/oauth/authorize?client_id=31724ccc00644d0a59c9a1f22dcaf4d8&redirect_uri=http://localhost:10000/oauth&response_type=code', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    .then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    });
  }// end handleLogin

  componentDidMount() {
    console.log('componentDidMount');
    console.log('is loggedin : ' + sessionStorage.getItem('matcher_login'));
    this.setState({isLoggedIn: sessionStorage.getItem('matcher_login')});

    var self=this;

    if(sessionStorage.getItem('matcher_login') == "false"){
      console.log("Create kakao login button")
      Kakao.init('');

      // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function(authObj) {
          console.log(authObj);

          axios.post('http://localhost:8080/auth/kakao/login', {
            headers: {
              'Access-Control-Allow-Origin' : '*'
            },
            data: authObj
          })
          .then((response) => {
            console.log(response);

            sessionStorage.setItem("matcher_login", 'true');
            self.setState({isLoggedIn: 'true'});
          })
          .catch(error => {
            console.log(error);
            self.setState({isLoggedIn: 'false'});
          });
        },
        fail: function(err) {
           alert(JSON.stringify(err));
        }
      }); // end method
    }
    else {
      console.log("Already loggedIn")
    }
  }// end method

  logout(){
    console.log('logout!')
    sessionStorage.setItem("matcher_login", 'false');
    this.setState({isLoggedIn:'false'});

    // history.push('/');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('ASDFASFSAA');
    console.log(this.state.isLoggedIn);
    console.log(nextState.isLoggedIn);
    return (this.state.isLoggedIn != nextState.isLoggedIn);
  }

  componentDidUpdate(prevProps, prevState){
    if(sessionStorage.getItem('matcher_login') == "false"){
      console.log("Create kakao login button")

      // TODO :: Already initialized
      // Kakao.init('');
      var self=this;

      // 카카오 로그인 버튼을 생성합니다.
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function(authObj) {
          console.log(authObj);

          axios.post('http://localhost:8080/auth/kakao/login', {
            headers: {
              'Access-Control-Allow-Origin' : '*'
            },
            data: authObj
          })
          .then((response) => {
            console.log(response);

            sessionStorage.setItem("matcher_login", true);
            self.setState({isLoggedIn: 'true'});
          })
          .catch(error => {
            console.log(error);
            self.setState({isLoggedIn: 'false'});
          });
        },
        fail: function(err) {
           alert(JSON.stringify(err));
        }
      }); // end method
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
