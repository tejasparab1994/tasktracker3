import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
function Task(params) {
  console.log("task params",params);
  let task = params.task;
  return (
    <Card>
      <CardHeader>
        <p><b> Title: </b>{task.title}
          <span className="assigned-to"><b> Assigned To: </b>{task.assigned.name} </span>
        </p>
      </CardHeader>
      <CardBody>
        <div>
          {/* Remove this later, the assigned by field */}
          <p> <b> Assigned By: </b> {task.user.name} </p>
          <p> <b> Description: </b> { task.body }</p>
          <p> <b> Completed: </b> {String(task.completed)}</p>
          <p> <b> Time Taken: </b> {task.time_taken} </p>
          {params.token.id === task.user.id || params.token.id === task.assigned.id ?
            <Link to={"/task-edit/" + task.id}>
              <Button color="primary">Edit</Button>
            </Link> : <p></p>}
        </div>
      </CardBody>
    </Card>
);
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Task);
