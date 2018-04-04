defmodule Tasktracker3Web.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use Tasktracker3Web, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Tasktracker3Web.ChangesetView, "error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(Tasktracker3Web.ErrorView, :"404")
  end

  def call(conn, {:error, "Login unsuccessful"}) do
    conn
    |> put_status(:im_a_teapot)
    |> render(Tasktracker3Web.ErrorView, :"418")
  end

  def call(conn, {:error, "Register unsuccessful"}) do
    conn
    |> put_status(:im_a_teapot)
    |> render(Tasktracker3Web.ErrorView, :"418")
  end
end
