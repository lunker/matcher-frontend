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
import DatePicker from '../components/DatePicker';


class Register extends Component {
  constructor(props){
    super(props);

    this.state={
      fromVisible: false,
      toVisible: false,
      fromReadOnly: true,
      toReadOnly: true,

      options: {
        exercise: [],
        city: [],
        gu: [],
        selectedGu: []
      },

      selectedInputs: {
        city: '',
        gu: '',
        areaCandidates: [],
        fromMatchingDate: new Moment(),
        toMatchingDate: new Moment(),
        exerciseId: -1
      },
      fromFocused: false,
      toFocused: false,
      times: [

      ]
    };
  }

  registerMatchRequest () {
    var self=this;

    console.log(this.state.selectedInputs);
    var params={
      city: this.state.selectedInputs.city,
      gu: this.state.selectedInputs.gu
    };

    axios({
      method:'post',
      url: 'http://localhost:8080/api/match',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: this.state.selectedInputs
    })
    .then((response) => {
      console.log(response);
      if(response.status== 200){
        alert('등록완료');
        self.props.history.push('/'); // redirect to Main page
      }
    });// end axios
  }// end method

  onCityChange (event, data) {
    var cityId=0;

    for(var idx in data.options){
      if(data.options[idx].text === data.value){
        cityId=data.options[idx].id;
        break;
      }
    }

    let newState=update(this.state, {
      selectedInputs: {$merge: {cityId: cityId}}, options: {$merge: {selectedGu: this.state.options.gu[data.value]}}
    }
    );
    this.setState(newState);
  }

  onGuChange (event, data) {
    console.log(data.value);

    var candidate={
      cityId:this.state.selectedInputs.cityId,
      guId:0
    };

    var guId=0;

    for(var idx in data.options){
      if(data.options[idx].text === data.value){
        guId=data.options[idx].id;
        break;
      }
    }

    candidate.guId=guId;
    let newState=update(this.state, {
      selectedInputs: {$merge: {gu: data.value}},
      selectedInputs: {areaCandidates: {$push: [candidate]}}
    });

    this.setState(newState);
  }

  onExerciseChange (event, data) {
    console.log(data);
    console.log(data.options);
    var exerciseId=0;

    for(var idx in data.options){
      if(data.options[idx].text === data.value){
        exerciseId=data.options[idx].id;
        break;
      }
    }
    console.log('Selected exercise id :: ' + exerciseId);

    let newState=update(this.state, {
      selectedInputs: {$merge: {exerciseId: exerciseId}}
    });
    this.setState(newState);
  }

  onFromDateChange (date) {
    let newState=update(this.state, {
      selectedInputs: {$merge: {fromMatchingDate: date}}}
    );

    this.setState(newState);
  }

  onToDateChange (date) {
    let newState=update(this.state, {
      selectedInputs: {$merge: {toMatchingDate: date}}}
    );

    this.setState(newState);
  }

  // React Lifecycle
  componentDidMount() {
    axios({
      method:'GET',
      url: 'http://localhost:8080/api/match/options',
      headrs: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      console.log(response);
      let newState=update(this.state, {options: {$merge: response.data}});

      this.setState(newState);
      console.log(this.state);
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
                <Dropdown options={this.state.options.city} scrolling={true}  selection placeholder='시' onChange={this.onCityChange.bind(this)}/>
                <Dropdown options={this.state.options.times} selection placeholder='Hours' onChange={this.onGuChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={2}>
                경기날짜
              </Grid.Column>
              <Grid.Column width={2}>

                <SingleDatePicker
                  date={this.state.selectedInputs.fromMatchingDate}
                  onDateChange={this.onFromDateChange.bind(this)}
                  focused={this.state.fromFocused}
                  onFocusChange={({ focused }) => {

                    const isFocused={focused};
                      this.setState({
                        fromFocused: isFocused.focused
                      });
                    }
                  }
                  showClearDate
                  small
                  displayFormat='YYYY-MM-DD'
                  readOnly={this.state.fromReadOnly}
                />
              </Grid.Column>

              <Grid.Column width={2}>
                <SingleDatePicker
                  date={this.state.selectedInputs.toMatchingDate}
                  onDateChange={this.onToDateChange.bind(this)}
                  focused={this.state.toFocused}
                  onFocusChange={({ focused }) => {
                    const isFocused={focused};
                      this.setState({
                        toFocused: isFocused.focused
                      });
                    }
                  }
                  showClearDate
                  small
                  displayFormat='YYYY-MM-DD'
                  readOnly={this.state.toReadOnly}
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
          <DatePicker onTimeChange={this.onTimeChange.bind(this)}/>
      </div>
    )
  }
};

export default Register;
