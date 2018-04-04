import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store = {store}>
      <Tasktracker state={store.getState()}/>
    </Provider>,
    document.getElementById('root'),
  );
}


let Tasktracker = connect((state) => state)((props) => {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            <div>
              <TaskForm users={props.users} />
              <Feed tasks={props.tasks}/>
            </div>
          } />
          <Route path ="/users" exact={true} render={() =>
            <Users users={props.users} />
          } />
          <Route path ="/tasks" exact={true} render={() =>
            <div>Hello from tasks Your assigned tasks here</div>
          } />
          {/* We have the code ready for your assigned task */}
          <Route path ="/users/:id" render={({match}) =>
            <Feed tasks = {_.filter(props.tasks, (pp) =>
            match.params.id == pp.user.id)
            } />
          } />
        </div>
      </Router>
    );
  });
