'use strict';
import React, {Component} from 'react';
import { Button, Confirm, Modal, Input, Dropdown, Grid} from 'semantic-ui-react'
import axios from 'axios';
import { Route } from 'react-router-dom';

// -- react-dates
import Moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, SingleDatePickerPhrases } from 'react-dates';

import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import omit from 'lodash/omit';


class Register extends Component {
  constructor(props){
    super(props);

    const list=[
      {
        key: 1,
        value:'1',
        text: '1'
      },
      {
        key:2 ,
        value: '2',
        text: '2'
      },
      {
        key: 3,
        value: '3',
        text: '3'
      }
    ];

    this.state={
      visible: false,
      list: list,
      inputs: {
        area: -1,
        date: -1,
        type: -1
      },
      date : new Moment(),
      focused: false
    };
  }

  registerMatchRequest () {
    var self=this;

    if(this.state.inputs.area == -1){
      alert("올바른 정보를 입력하세요");
      return ;
    }

    console.log(this.state.inputs.area);

    var requestBody={
      date: this.state.inputs.date,
      area: this.state.inputs.area,
      type: this.state.inputs.area
    };


    console.log(requestBody);

    axios.post('http://localhost:8080/api/match', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },

      data: requestBody
    }).then((response) => {
      console.log(response);
      if(response.status== 200){
        alert('등록완료');
        self.props.history.push('/');
      }

    });
  }// end method

  onAreaChange (event, data) {
    // this.state.inputs.area=data.value;
    this.setState({inputs: {area: data.value}});
  }

  onTypeChange (event, data) {
  }

  onDateChange (event, data) {
    console.log(data.value);
  }

  render(props){
    return (
      <div>
          <Grid
            divided
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>

            <Grid.Row>
              <Grid.Column width={1}>
                지역
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown options={this.state.list} fluid selection placeholder='Select Area' onChange={this.onAreaChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={1}>
                경기날짜
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown options={this.state.list} fluid selection placeholder='Select Date' onChange={this.onDateChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={1}>
                Type
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown options={this.state.list} fluid selection placeholder='Select Type' onChange={this.onTypeChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

          </Grid>
          <hr />


          <Button onClick={this.registerMatchRequest.bind(this)}>매치 요청</Button>
          <SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired

          />
      </div>
    )
  }
};

export default Register;
