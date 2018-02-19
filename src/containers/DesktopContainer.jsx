
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import  MatcherHeader  from '../components/Header';


class DesktopContainer extends Component {

  constructor(props){
    super(props);
    console.log('DesktopContainer props:');
    console.log(props);
    this.state={};
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive >
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{ minHeight: 50, padding: '1em 0em', margin: '0em 0em 2em 0em' }} vertical>
            <MatcherHeader fixed={this.state.fixed} location={this.props.location}/>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}


export default DesktopContainer;
