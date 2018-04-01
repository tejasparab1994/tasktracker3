import React from 'react';
import Task from './task';

export default function Feed(params) {
  console.log("Here in feed", params);
  let tasks=_.map(params.tasks, (pt) => <Task key={pt.id} task={pt} />);
  return <div>
    {tasks}
  </div>;
}
