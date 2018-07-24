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
token: string,

},
token: {
id: Number,
token: String,
},
login: {
name: String,
pass: String
}
}
*/

function token(state = null, action) {
  switch(action.type) {
    case 'SET_TOKEN':
    console.log("here in set token", action.token);
    return action.token;
    case 'LOGOUT':
    return null;
    default:
    return state;
  }
}


let empty_login  = {
  name: "",
  pass: "",
};

function login(state= empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
    return Object.assign({}, state, action.data);
    case 'SET_LOGIN_ERROR':
    // You have error message here from api, return statement modify with that
    return empty_login;
    default:
    return state;
  }
}

function register(state = empty_login, action) {
  switch(action.type) {
    case 'UPDATE_REGISTER_FORM':
    return Object.assign({}, state, action.data);
    case 'CLEAR_REGISTER':
    return empty_login;
    case 'SET_REGISTER_ERROR':
    return empty_login;
    default:
    return state;
  }
}

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

    return [action.task, ...state];
    case 'UPDATE_TASK':
    console.log("//////action.task/////////", action.task);
    return [action.task, ..._.reject(state, function(task){return task.id == action.task.id})];
    default:
    return state;
  }
}


function form(state = empty_form, action) {
  console.log("are we inside form in store?");
  switch (action.type) {
    case 'UPDATE_FORM':
    return Object.assign({}, state, action.data);
    case 'ADD_TASK':
    return Object.assign({},state, empty_form);
    case 'SET_TOKEN':
    return Object.assign({},state,{token: action.token.token});
    case 'CLEAR_FORM':
    return empty_form;

    default:
    return state;
  }
}

function edit_task(state = null, action) {
  switch (action.type) {
    case 'EDIT_FORM':
    console.log("////////action edit task lets see", action.data)
    return Object.assign({}, state, action.data);
    case 'SET_TOKEN':
    return Object.assign({},state,{token: action.token.token});
    case 'UPDATE_TASK':
    return null;
    case 'CLEAR_FORM':
    return empty_form;
    default:
    return null;
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
  let reducer = combineReducers({users, tasks, form, login, register, token, edit_task});
  let state1 = reducer(state0, action);
  console.log("state1 in reducer", state1);
  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
