defmodule Tasktracker3Web.TaskView do
  use Tasktracker3Web, :view
  alias Tasktracker3Web.TaskView
  alias Tasktracker3Web.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      title: task.title,
      body: task.body,
      time_taken: task.time_taken,
      completed: task.completed,
      user: render_one(task.user, UserView, "user.json"),
      assigned: render_one(task.user, UserView, "user.json")
    }
  end
end
