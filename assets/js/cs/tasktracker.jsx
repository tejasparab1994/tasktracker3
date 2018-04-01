import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';

export default function tasktracker_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Tasktracker />, root);
}


class Tasktracker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: [],
      users: [],
    };

    this.request_tasks();
    this.request_users();
  }

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { tasks: resp.data }));
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }


  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            <div>
              <Feed tasks={this.state.tasks}/>
            </div>
          } />
          <Route path ="/users" exact={true} render={() =>
            <Users users={this.state.users} />
          } />
          <Route path ="/tasks" exact={true} render={() =>
            <div>Hello from tasks</div>
          } />

        </div>
      </Router>
    );
  }
}
