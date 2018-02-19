import React, { Component } from 'react';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';
// const MobileDetect = require('mobile-detect');
// const md = new MobileDetect(req.headers['user-agent']);


class MatcherContainer extends Component{
  constructor(props){
    super(props);
  }

  render() {
    const { children } = this.props

    return(
      <div>
        <DesktopContainer {...this.props}>{children}</DesktopContainer>
      </div>
    );
  }
}

export default MatcherContainer;
