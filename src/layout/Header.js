/**
 * Created by voiceloco on 2018. 1. 23..
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Router=require('react-router');
const Link=Router.Link;

class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <ul>
                    <li><Link to="1">header1</Link></li>
                    <li><Link to="2">header2</Link></li>
                    <li><Link to="3">header3</Link></li>
                    <li><Link to="4">header4</Link></li>
                </ul>
            </div>
        );
    }
}


ReactDOM.render(
    <Header />,
    document.getElementById('header')
)
