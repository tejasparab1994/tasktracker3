import React from 'react';
import Task from './task';
import { connect } from 'react-redux';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';


export default RegisterForm = connect((props, {register}) => {return Object.assign({}, props, register);})((props) => {

    console.log(props);
    function create_user(ev) {
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
      <Form>
        <FormGroup>
          <Input type="text" name="name" placeholder="name"
            value={props.register.name} onChange={update} />
        </FormGroup>

        <FormGroup>
          <Input type="password" name="password" placeholder="password"
            value={props.register.password} onChange={update} />
        </FormGroup>
        <Button onClick={create_user}>Register</Button>
      </Form>
    </div>;
});
