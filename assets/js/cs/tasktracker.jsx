import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';

import Assigned from './assigned';
import api from '../api';
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
            {props.token ?<Feed tasks={props.tasks}/>: <RegisterForm history={props.history}/>}

          </div>
        } />
        <Route path ="/users" exact={true} render={() =>
          <Users users={props.users} />
        } />
        <Route path ="/task-form" exact={true} render={() =>
          <div>
            <TaskForm user={parseInt(props.token.id)} />
          </div>
        } />
        {/* We have the code ready for your assigned task */}
        <Route path ="/assigned" exact={true} render={() =>

          <div>
            {props.token ? <Assigned tasks = {
              _.filter(props.tasks, (task) =>

              task.assigned.id == props.token.id)} /> : <div></div>}
          </div>
        } />


        </div>
      </Router>
    );

  });


  let RegisterForm = connect((props, {register}) => {return Object.assign({}, props, register);})((props) => {

    
    function create_user(ev) {
        console.log("create_user", props);
        api.create_new_user(props.register, props.history);
    }

    function update(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        props.dispatch({
            type: 'UPDATE_REGISTER_FORM',
            data: data,
        });
    }

    return <div style={ {padding: "4ex"} }>
      <h2>Register</h2>
      <Form>
        <FormGroup>
          <Input type="text" name="name" placeholder="name"
            value={props.register.name} onChange={update}/>
        </FormGroup>

        <FormGroup>
          <Input type="password" name="pass" placeholder="password"
            value={props.register.pass} onChange={update}/>
        </FormGroup>
        <Button onClick={create_user}>Register</Button>
      </Form>
    </div>;
});
