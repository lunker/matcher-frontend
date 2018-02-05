import React from 'react';
import {Form, Segment, Button, Grid} from 'semantic-ui-react';


const Home = () => {
    return (
        <div>
            <h2>
                home
            </h2>

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
        </div>
    );
};

export default Home;
