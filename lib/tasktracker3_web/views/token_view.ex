defmodule Tasktracker3Web.TokenView do
  use Tasktracker3Web, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      id: user.id,
      token: token,
      user_name: user.name
    }
  end
end
