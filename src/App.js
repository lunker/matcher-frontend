'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Project = require('./components/project');
const Bootstrap = require('react-bootstrap');
const Button = require('react-bootstrap').Button;
const ButtonToolBar = require('react-bootstrap').ButtonToolBar;

const ReactRouter=require('react-router');
const browserHistory=ReactRouter.browserHistory;
const Route=ReactRouter.Route;
const Router=ReactRouter.Router;
const IndexRoute=ReactRouter.index;
// import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// import { Router, Route, browserHistory, IndexRoute } from 'react-router';
const ProjectWrapper = require('./wrappers/PostWrapper');



class App extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {employees: []};
    }

    /*
    componentDidMount() {
        client({method: 'GET', path: '/api/employees'}).done(response => {
            this.setState({employees: response.entity._embedded.employees});
        });
    }
    */

    render() {
        return (
            <div>
                hi!
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={App}/>
            <Route path="1" component={ProjectWrapper}/>
        </Route>
    </Router>,
    document.getElementById('app')
)