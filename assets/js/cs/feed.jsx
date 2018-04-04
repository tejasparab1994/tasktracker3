import React from 'react';
import Task from './task';

export default function Feed(params) {
  let tasks=_.map(params.tasks, (pt) => <Task key={pt.id} task={pt} />);
  return <div>
    {tasks}
  </div>;
}
