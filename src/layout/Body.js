/**
 * Created by voiceloco on 2018. 1. 23..
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Button = require('react-bootstrap').Button;


class Body extends React.Component{

    constructor(props){
        super(props)
        this.state={name:'hello state'}
    }

    /*
    registerProject = (e) => {
        e.preventDefault();
        console.log('Click RegisterProject Button');
    };
    */

    render(){

        return(
            <div>
                <Button onClick={this.registerProject}>Register</Button>
                {this.state.name}
            </div>
        );
    }
}


ReactDOM.render(
    <Body/>,
    document.getElementById('body')
);