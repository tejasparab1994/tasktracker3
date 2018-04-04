import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';


function TaskForm(params) {

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    console.log("checked value", ev.target.checked);
    let value = ev.target.type === 'checkbox' ? ev.target.checked : tgt.val();
    data[tgt.attr('name')] = value;
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };

    console.log("update form",action);
    params.dispatch(action);
  }


  function submit(ev) {
    console.log("params.fomr",params.form);
    api.submit_task(params.form);
  }

  let users = _.map(params.users, (uu) => <option key = {uu.id} value={uu.id}>{uu.name}</option>);
  return (
    <div style={{padding: "4ex"}}>
      <h2>New Task</h2>
      <FormGroup>
        <Label for="user_id">Assigned by</Label>
        <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
          { users }
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="title" >Title</Label>
        <Input name="title" value={params.form.title}
          onChange={update}/>
      </FormGroup>

      <FormGroup>
        <Label for="body" > Description</Label>
        <Input type="textarea" name="body" value={params.form.body}
          onChange={update}/>
      </FormGroup>

      <FormGroup>
        <Label for="assigned" >Assigned to</Label>
        <Input type="select" name="assigned_id" value={params.form.assigned_id} onChange={update}>
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
        <Input placeholder="in mins" name="time_taken" type="number" step="15" value={params.form.time_taken}
          onChange={update} />
      </FormGroup>

      <Button onClick={submit}> Post</Button> &nbsp;
      <Button onClick={() => alert("TODO: Manage state")}>Clear</Button>
    </div>
          );
        }

        function state2props(state) {
          return {
            form: state.form,
            users: state.users,
          };
        }

        export default connect(state2props)(TaskForm);