import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

export default function Task(params) {
  let task = params.task;
  console.log("completed?", task.completed);
  return (
    <Card>
      <CardHeader>
        <p><b> Title: </b>{task.title}
          <span className="assigned-to"><b> Assigned To: </b>{task.assigned.name} </span>
        </p>
      </CardHeader>
      <CardBody>
        <div>
          <p> <b> Assigned by: </b> {task.user.name}</p>
          <p> <b> Description: </b> { task.body }</p>
          <p> <b> Completed: </b> {String(task.completed)}</p>
          <p> <b> Time Taken: </b> {task.time_taken} </p>
        </div>
      </CardBody>
    </Card>
  );
}
