import store from './store';

class TheServer {

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  submit_task(data) {
    console.log("ajax working?",data);
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({"task": data}),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'SET_LOGIN_ERROR',
          error: resp,
        });
      }
    });
  }

  create_new_user(data, history)   {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'CLEAR_REGISTER',
          data: resp,
        });

      },
      error: (resp) => {
        console.log("error", resp)
      }
    });
  }

  edit_task(data, token, id) {
    console.log("entering edit task in api", data);
    $.ajax("/api/v1/tasks/" + data.id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: token, "task": data, "id":id }),
      success: (resp) => {
        console.log("response", resp);
        store.dispatch({
          type: 'UPDATE_TASK',
          task: resp.data,
        });
      },
      error: (resp) => {
        console.error("error", resp)
      }
    });
  }
}




export default new TheServer();
