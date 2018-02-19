import React, {Component} from 'react';
import { Dropdown, Icon, Label } from 'semantic-ui-react'
import axios from 'axios';
// -- react-dates
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import update from 'immutability-helper';


class DataLabel extends Component {
  constructor(props){
    super(props);
  }

  handleIconOverrides = predefinedProps => ({
    onClick: (e) => {
      _.invoke(predefinedProps, 'onClick', e, predefinedProps)
      this.props.onDeleteClick(this.props.value);
    },
  })

  render(){
    return(
      <div>
        <Label as='a'>
          {this.props.value}
          {Icon.create({name:'delete'}, {
            overrideProps: this.handleIconOverrides,
          })}
        </Label>
      </div>
    );
  }
}

export default DataLabel;
