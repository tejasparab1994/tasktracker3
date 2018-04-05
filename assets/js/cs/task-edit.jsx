import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


function TaskEdit(params) {

  function update(ev) {
    console.log("here inside edit params", params)
    let tgt = $(ev.target);
    let data = {};
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    data[tgt.attr('name')] = value;
    data["user_id"] = params.user;
    data["token"] = params.token;
    console.log(params.token);
    data["task_id"] = params.task_id;
    let action = {
      type: 'EDIT_FORM',
      data: data,
    };

    console.log("edit form",action);
    params.dispatch(action);
  }

  function clear(){
      params.dispatch({type: 'CLEAR_FORM'});
  }

  function submit(ev) {
    console.log("params.fomr",params.form);
    api.edit_task(params.form);
  }

  let users = _.map(params.users, (uu) => <option key = {uu.id} value={uu.id}>{uu.name}</option>);
  return (

    <div style={{padding: "4ex"}}>
      <h2>Edit Task</h2>
      <FormGroup>
        {/* <Label for="user_id">Assigned by</Label>
          <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
          <option></option>
          { users }
        </Input> */}
      </FormGroup>

      <FormGroup>
        <Label for="title" >Title</Label>
        <Input name="title" defaultValue={params.form.title}
          onChange={update}/>
      </FormGroup>

      <FormGroup>
        <Label for="body" > Description</Label>
        <Input type="textarea" name="body" defaultValue={params.form.body}
          onChange={update}/>
      </FormGroup>

      <FormGroup>
        <Label for="assigned" >Assigned to</Label>
        <Input type="select" name="assigned_id" defaultValue={params.form.assigned_id} onChange={update}>
          <option></option>
          { users }
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="completed"  check>Completed</Label>
        &nbsp;
        <Input type="checkbox" name="completed" checked={params.form.completed}
          onChange={update}/> {' '}
      </FormGroup>

      <FormGroup>
        <Label for="time_taken">Time taken</Label>
        <Input placeholder="in mins" name="time_taken" type="number" step="15" defaultValue={params.form.time_taken}
          onChange={update} />
      </FormGroup>

      <Button onClick={submit}> Post</Button> &nbsp;
      <Button onClick={clear}>Clear</Button>
    </div>
          );
        }
        function state2props(state) {
          return {
            dispatch: state.dispatch,
            token: state.token,
          };
        }

export default connect(state2props)(TaskEdit)
