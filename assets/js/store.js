import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


/*

Our state:
  {
  users: [...Users...],
  tasks: [...Tasks...],
  form: {
      id: Number,
      title: String,
      body: Text,
      assigned: Number,
      completed: Boolean,
      time_taken: Number,
  },
}
*/

function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    default:
      return state;
  }

}

function tasks(state = [], action) {
  switch (action.type) {
    case 'TASKS_LIST':
      return [...action.tasks];
    case 'ADD_TASK':
      console.log("//////action.task/////////", action.task);
      return [action.task, ...state];
    default:
      return state;
  }
}


function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      console.log("/////////here in action.data//////////", action.data);
      console.log("/////////here in action.task in update form//////////", action.task);
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    default:
      return state;
  }
}

let empty_form = {
  user_id: "",
  title: "",
  body: "",
  time_taken: 0,
  completed:  false,
  assigned_id: "",
}

function root_reducer(state0, action) {
  console.log("state0 in reducer", state0);
  console.log("action in reducer", action);
  // calls multiple reducers here and their output
  let reducer = combineReducers({users, tasks, form});
  let state1 = reducer(state0, action);
  console.log("state1 in reducer", state1);
  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
