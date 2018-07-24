defmodule Tasktracker3Web.TaskController do
  use Tasktracker3Web, :controller

  alias Tasktracker3.Tasks
  alias Tasktracker3.Tasks.Task

  action_fallback(Tasktracker3Web.FallbackController)

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    token = task_params["token"]

    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)

    if task_params["user_id"] != user_id do
      IO.inspect({:bad_match, task_params["user_id"], user_id})
      raise "hax!"
    end

    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "token" => token, "task" => task_params}) do
    IO.inspect(task_params)
    IO.inspect("in here inside update?")
    task = Tasks.get_task!(id)
    {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)

    if task_params["user_id"] != user_id do
      raise "Unauthorized user"
    end

    {:ok, new_task} = Tasks.update_task(task, task_params)
    IO.inspect(new_task)

    with %Task{} = task <- new_task do
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
