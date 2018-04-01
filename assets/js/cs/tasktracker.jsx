import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function tasktracker_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Tasktracker />, root);
}


class Tasktracker extends React.Component {
  render(){
    return (
      <div>Hello from tasktracker</div>
    );
  }
}
