import React, {Component} from 'react';
import { Button, Confirm, Modal, Input, Dropdown, Grid} from 'semantic-ui-react'
import axios from 'axios';
import { Route } from 'react-router-dom';
// -- react-dates
import Moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, SingleDatePickerPhrases } from 'react-dates';

import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import omit from 'lodash/omit';
import update from 'immutability-helper';


class DatePicker extends Component {
  constructor(props){
    super(props);

    var times=[];
    var timeObject={};

    for (var hour=0; hour<23; hour++){
      var strHour=hour+'';

      strHour=strHour.padStart(2,'0') + ':00';
      timeObject={
        key: strHour,
        text: strHour,
        value: hour
      };
      times.push(timeObject);
    }

    this.state={
      readOnly: true,
      focused: false,
      selectedDate: new Moment(),
      times: times
    };
  }

  onDateChange(date) {
    console.log('onDateChanged()');
    let newState=update(this.state, {
      $merge: {selectedDate: date}
    });
    this.setState(date);

  }

  onTimeChange(event, data) {
    console.log('onTimeChange()');
    console.log(data);

    var currentDate=this.state.selectedDate;

    console.log('current hour : ' + currentDate.hours());
    currentDate.hours(data.value);
    console.log('new current hour : ' + currentDate.hours());

    let newState=update(this.state, {
      $merge: {selectedDate: date}
    });

    this.setState(date);
  }

  render(){
    return (
      <div>
        <SingleDatePicker
          date={this.state.selectedDate}
          onDateChange={this.onDateChange.bind(this)}
          focused={this.state.focused}
          onFocusChange={({ focused }) => {
            const isFocused={focused};
              this.setState({
                focused: isFocused.focused
              });
            }
          }
          showClearDate
          small
          displayFormat='YYYY-MM-DD'
          readOnly={this.state.readOnly}
        />

        <Dropdown options={this.state.times} selection placeholder='Hours' onChange={this.onTimeChange.bind(this)}/>
      </div>
    );
  }

}

export default DatePicker;