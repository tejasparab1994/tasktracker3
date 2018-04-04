defmodule Tasktracker3Web.UserController do
  use Tasktracker3Web, :controller

  alias Tasktracker3.Users
  alias Tasktracker3.Users.User

  action_fallback(Tasktracker3Web.FallbackController)

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, user_params = %{"name" => name, "pass" => pass}) do
    IO.puts("working in create?")

    with {:ok, %User{} = user} <-
           Tasktracker3.Users.create_user(%{"name" => name, "password_hash" => pass}) do
      IO.puts("is this working??")

      conn
      |> put_status(:created)
      |> render("user.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
