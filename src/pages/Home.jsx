import React, {Component} from 'react';
import {Form, Segment, Button, Grid} from 'semantic-ui-react';
import axios from 'axios';
import FBLoginButton from '../components/FBLoginButton';


class Home extends Component {

  constructor(props){
    super(props);
    console.log(sessionStorage.getItem('matcher_token'));
  }

  requestPushToken () {
    let token='';
    token = sessionStorage.getItem('matcher_token');

    if(token != null){
      let uuid=sessionStorage.getItem('matcher_kakao_user_id');

      axios.get('http://localhost:8080/api/auth/kakao/token?uuid=' + uuid)
      .then((response)=>{
        console.log(response);
      })
      .catch((error)=>{
        console.log(error);
      });
    }
    else{
      console.log('No valid token');
    }
  }// end method


  sendToMe(){
    let token='';
    token = sessionStorage.getItem('matcher_token');

    axios({
      method:'get',
      url: 'http://localhost:8080/api/match/send?token=' + token
    })
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.error(error);
    });
  }

  render(){
    return (
        <div>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{maxWidth: 450}}>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />
                  <Button color='teal' fluid size='large'>Login</Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>

          <Button onClick={this.requestPushToken.bind(this)}>request push token</Button>
          <Button onClick={this.sendToMe.bind(this)}>나에게 보내기 테스트</Button>

        <FBLoginButton />
        </div>
    );// end return
  }
}

export default Home;
