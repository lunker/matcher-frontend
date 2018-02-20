import React, {Component} from 'react';
import { Button, Confirm, Modal, Input, Dropdown, Grid, List, Label} from 'semantic-ui-react'
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

import DateLabel from './DateLabel';


class DatePicker extends Component {
  constructor(props){
    super(props);

    var times=[];
    var timeObject={};

    var minute='00';

    for (var hour=0; hour<23; hour++){
      var strHour=hour+'';

      strHour=strHour.padStart(2,'0') + ':' + minute;
      timeObject={
        key: strHour,
        text: strHour,
        value: strHour
      };
      times.push(timeObject);
    }

    var confirm=false;
    var disabled=false;
    var defaultValue=new Moment();

    confirm = this.props.confirm === undefined? false : this.props.confirm;
    disabled = this.props.disabled === undefined? false : this.props.disabled;
    defaultValue = this.props.defaultValue === undefined? new Moment() : this.props.defaultValue;

    console.log('confirm! ' + confirm);

    console.log('disabled:: ' + this.props.disabled);

    this.state={
      readOnly: true,
      focused: false,
      selectedDate: defaultValue,
      times: times,
      confirm: confirm,
      options:{
        open: false,
        onCancel: () => {
          let newState=update(this.state, {
            options: {$merge: {open: false}}
          });
          this.setState(newState);
        },
        onConfirm: () => {
          let newState=update(this.state, {
            options: {$merge: {open: false}}
          });
          this.setState(newState);
        }
      },
      isTimeSelected: false,
      disabled: disabled,
      defaultValue: defaultValue
    };
  }

  onDateChange(date) {
    console.log('onDateChanged()');

    if(this.state.isTimeSelected == true) {
      var currentDate=this.state.selectedDate;
      var currentHour=this.state.selectedDate.hour();
      var currentMinute=this.state.selectedDate.minute();

      date.hour(currentHour);
      date.minute(currentMinute);
      this.props.onDateChange(date);
    }

    let newState=update(this.state, {
      $merge: {selectedDate: date}
    });

    this.setState(newState);
  }

  onTimeChange(event, data) {
    /*
    console.log('on time change: '+ this.state.confirm);

    if(this.state.confirm == true){
      let newState=update(this.state, {
        options: {$merge: {open: true}}
      });

      this.setState(newState);
      console.log('open!!!!!!!!!!!!!!!!!!');
    }
    */

    var currentDate=this.state.selectedDate;
    var selectedH='';
    var selectedM='';

    selectedH=data.value.split(':')[0];
    selectedM=data.value.split(':')[1];

    console.log('current hour : ' + currentDate.hours());
    currentDate.hour(selectedH);
    currentDate.minute(selectedM);

    console.log('new current hour : ' + currentDate.hours());

    let newState=update(this.state, {
      $merge: {
        selectedDate: currentDate,
        isTimeSelected: true
      }
    });

    this.setState(newState);
    this.props.onDateChange(currentDate);
  }

  render(){
    return (
      <div>
        <SingleDatePicker
          date={this.state.selectedDate}
          onDateChange={this.onDateChange.bind(this)}
          focused={this.state.focused}
          onFocusChange={({ focused }) => {

              if(this.state.disabled == true){
                const isFocused={focused};

                this.setState({
                  focused: isFocused.focused
                });
              }

            }
          }
          showClearDate
          small
          displayFormat='YYYY-MM-DD'
          readOnly={this.state.readOnly}
        />

        <Dropdown options={this.state.times} selection placeholder='Hours' onChange={this.onTimeChange.bind(this)}/>
        <Confirm
          open={this.state.options.open}
          onCancel={this.state.options.onCancel.bind(this)}
          onConfirm={this.state.options.onConfirm.bind(this)}
        />
      </div>
    );
  }

}

export default DatePicker;
