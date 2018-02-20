import React, {Component} from 'react';
import { Button, Confirm, Modal, Input, Dropdown, Grid, List, Icon} from 'semantic-ui-react'
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
        selectedGu: []
      },

      selectedInputs: {
        city: '',
        gu: '',
        areaCandidates: [],
        fromMatchingDate: new Moment().hour(0).minute(0),
        toMatchingDate: new Moment().hour(0).minute(0),
        matchingDateCandidates: [],
        exerciseId: -1
      },
      fromFocused: false,
      toFocused: false,
    };
  }

  registerMatchRequest () {
    var self=this;

    console.log(this.state.selectedInputs);

    var params=this.state.selectedInputs;
    var tmpTimezone=params.matchingDateCandidates;
    var candidate;
    var timezoneArr=[];


    for(var idx=0; idx<tmpTimezone.length; idx++){
      candidate=tmpTimezone[idx];
      candidate=candidate.props.value;

      candidate=candidate.split('~');

      timezoneArr.push({
        fromMatchingDate: candidate[0],
        toMatchingDate: candidate[1]
      });
    }

    params.matchingDateCandidates=timezoneArr;

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

  labelWrapper= (from, to) => {
    const value=from + ' ~ ' + to;

    return (
      <DateLabel value={value} index={this.state.selectedInputs.matchingDateCandidates.length} onDeleteClick={this.deleteLabel.bind(this)}
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
    var from=this.state.selectedInputs.fromMatchingDate;
    var to=this.state.selectedInputs.toMatchingDate;
    var self=this;

    if(this.isValidTimezone(from, to)){
      from=from.format('YYYY-MM-DD HH:mm').toString();
      to=to.format('YYYY-MM-DD HH:mm').toString();

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
                <Dropdown options={this.state.options.selectedGu} selection placeholder='구' onChange={this.onGuChange.bind(this)}/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={2}>
                경기날짜
              </Grid.Column>
              <Grid.Column width={2}>
                <DatePicker onDateChange={this.onFromDateChange.bind(this)} disabled/>
              </Grid.Column>

              <Grid.Column width={2}>
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
