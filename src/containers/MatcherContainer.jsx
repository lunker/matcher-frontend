import React, { Component } from 'react';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';


class MatcherContainer extends Component{
  constructor(props){
    super(props);
  }

  render() {
    const { children } = this.props
    
    return(
      <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
      </div>
    );
  }
}

export default MatcherContainer;
