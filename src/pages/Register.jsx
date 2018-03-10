import React, {Component} from 'react';
import { Button, Confirm, Modal, Input, Dropdown, Grid, List, Icon, Form} from 'semantic-ui-react'
import axios from 'axios';
import { Route } from 'react-router-dom';
import _ from 'lodash';

// -- react-dates
import Moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import omit from 'lodash/omit';
import update from 'immutability-helper';
import DatePicker from '../components/DatePicker';
import DateLabel from '../components/DateLabel';


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
        selectedGu: [],
        availableAttendeeNum:[]
      },

      selectedInputs: {
        city: '',
        gu: '',
        areaCandidates: [],
        fromMatchingDate: new Moment().hour(0).minute(0),
        toMatchingDate: new Moment().hour(0).minute(0),
        matchingDateCandidates: [],
        exerciseId: -1,
        attendeeNum: 0
      },
      fromFocused: false,
      toFocused: false,
    };
  }

  registerMatchRequest () {
    var self=this;

    var params=this.state.selectedInputs;
    var tmpTimezone=params.matchingDateCandidates;
    var candidate;
    var timezoneArr=[];

    for(var idx=0; idx<tmpTimezone.length; idx++){
      candidate=tmpTimezone[idx];

      timezoneArr.push({
        fromMatchingDate: candidate.props.from.format('YYYY-MM-DD'),
        fromMatchingHour: candidate.props.from.hour()
      });
    }

    params.matchingDateCandidates=timezoneArr;
    console.log('Register match request params::');
    console.log(params);

    axios({
      method:'post',
      url: 'http://localhost:8080/api/match',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: params
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
    console.log(data.options);
    var exerciseId=0;
    var attendeeCandidates=[];

    for(var idx in data.options){
      if(data.options[idx].text === data.value){
        exerciseId=data.options[idx].id;
        var maxAttendee=data.options[idx].maxParticipant;

        // generate attendee options
        for(var idx=1; idx<maxAttendee; idx++){
          attendeeCandidates.push({
            "key": "max_attendee" + idx,
            "value":idx,
            "text": idx
          });
        }
        break;
      }
    }
    console.log(attendeeCandidates);

    let newState=update(this.state, {
      selectedInputs: {$merge: {exerciseId: exerciseId}},
      options: {$merge: {availableAttendeeNum: attendeeCandidates}}
    });
    this.setState(newState);
  }

  labelWrapper (from, to) {
    // const value=from + ' ~ ' + to;
    console.log('Create date label');
    console.log(from);
    console.log(to);

    return (
      <DateLabel
        key={from}
        from={from}
        to={to}
        index={this.state.selectedInputs.matchingDateCandidates.length}
        onDeleteClick={this.deleteLabel.bind(this)}
      />
    );
  }

  onFromDateChange (date) {
    let newState=update(this.state,
      {
        selectedInputs: {
          $merge: {fromMatchingDate: date}
        }
      }
    );

    this.setState(newState);
  }

  deleteLabel(value){
    var tmp=this.state.selectedInputs.matchingDateCandidates;
    var candidateIdx=_.findIndex(tmp, (candidate)=>{
      return candidate.props.value == value;
    });

    if(candidateIdx == -1){
      console.warn('Value : ' + value + 'is not founded on this.state.selectedInputs.matchingDateCandidates');
      return ;
    }
    var newTmp=tmp.splice(candidateIdx, 1);

    let newState=update(this.state, {
      selectedInputs:{$merge: {matchingDateCandidates: tmp}}
    });

    this.setState(newState);
  }

  onToDateChange (date) {
    let newState={};
    newState=update(this.state, {
        selectedInputs: {
          $merge: {toMatchingDate: date}
        }
      }
    );

    this.setState(newState);
  }

  addTimezone() {
    var from=this.state.selectedInputs.fromMatchingDate.get();
    console.log('from!');
    console.log(from);
    var to=this.state.selectedInputs.toMatchingDate;
    var self=this;

    if(this.isValidTimezone(from, to)){
      // create label
      let newState=update(this.state, {
          selectedInputs: {
            matchingDateCandidates: {$push: [self.labelWrapper(from, to)]}
          }
        }
      );

      this.setState(newState);
    }
    else{
      alert('올바른 시간대를 선택하세요');
      return ;
    }
  }

  isValidTimezone(from, to){
    console.log(from);
    console.log(to);
    return from.isBefore(to);
  }

  handleIconOverrides = predefinedProps => ({
    onClick: (e) => {
      _.invoke(predefinedProps, 'onClick', e, predefinedProps)
      this.addTimezone();
    },
  })

  onAttendeeNumChange(event, data){
    console.log("Set attendeeNum as : " + data.value);
    let newState=update(
      this.state,
      {
        selectedInputs:{
          $merge: {attendeeNum: data.value}
        }
      }
    );

    this.setState(newState);
  }

  //--- React Lifecycle
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
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>

            <Grid.Row>

                <Grid.Column width={2}>
                  <label>지역</label>
                </Grid.Column>

                <Grid.Column width={6}>
                  <Dropdown options={this.state.options.city} scrolling={true}  selection placeholder='시' onChange={this.onCityChange.bind(this)}/>
                  <Dropdown options={this.state.options.selectedGu} selection placeholder='구' onChange={this.onGuChange.bind(this)}/>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={2}>
                경기날짜
              </Grid.Column>
              <Grid.Column width={6}>
                <DatePicker onDateChange={this.onFromDateChange.bind(this)} disabled/>

                <DatePicker onDateChange={this.onToDateChange.bind(this)} confirm={true} disabled/>
                  {Icon.create({name:'plus'}, {
                    overrideProps: this.handleIconOverrides,
                  })}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <List items={this.state.selectedInputs.matchingDateCandidates}/>
            </Grid.Row>

            <Grid.Row >
              <Grid.Column width={2}>
                exercise
              </Grid.Column>
              <Grid.Column width={6}>
                <Dropdown options={this.state.options.exercise}  selection placeholder='Select Type' onChange={this.onExerciseChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>


            <Grid.Row >
              <Grid.Column width={2}>
                참가인원
              </Grid.Column>
              <Grid.Column width={6}>
                <Dropdown options={this.state.options.availableAttendeeNum}  selection placeholder='참가인원' onChange={this.onAttendeeNumChange.bind(this)}/>
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
