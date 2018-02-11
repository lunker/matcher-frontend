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


class Register extends Component {
  constructor(props){
    super(props);

    this.state={
      visible: false,
      readOnly: true,
      options:{
        exercise:[]
      },
      list: [],
      inputs: {
        area: -1,
        date: -1,
        exercise: -1
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
      exercise: this.state.inputs.exercise
    };

    console.log(requestBody);
    axios({
      method:'post',
      url: 'http://localhost:8080/api/match',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: requestBody
    })
    .then((response) => {
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

  onExerciseChange (event, data) {
    this.setState({inputs: {exercise: data.value}});
  }

  onDateChange (date) {
    console.log(date);
    this.setState({date: date});
  }

  // React Lifecycle
  componentDidMount() {
    axios({
      method:'GET',
      url: 'http://localhost:8080/api/match/options'
    })
    .then((response)=>{
      console.log(response);
      console.log(response.data.exercise);

      this.setState({options: {exercise: response.data.exercise}});
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  render(props){
    return (
      <div>
          <Grid
            divided
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>

            <Grid.Row columns={6}>
              <Grid.Column width={2}>
                지역
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown options={this.state.list} fluid selection placeholder='Select Area' onChange={this.onAreaChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={2}>
                경기날짜
              </Grid.Column>
              <Grid.Column width={4}>
                <SingleDatePicker
                  date={this.state.date}
                  onDateChange={this.onDateChange.bind(this)}
                  focused={this.state.focused}
                  onFocusChange={({ focused }) => this.setState({ focused })}
                  showClearDate
                  small
                  displayFormat='YYYY-MM-DD'
                  readOnly={this.state.readOnly}
                  />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row >
              <Grid.Column width={2}>
                exercise
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown options={this.state.options.exercise} fluid selection placeholder='Select Type' onChange={this.onExerciseChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

          </Grid>
          <hr />

          <Button onClick={this.registerMatchRequest.bind(this)}>매치 요청</Button>
      </div>
    )
  }
};

export default Register;
