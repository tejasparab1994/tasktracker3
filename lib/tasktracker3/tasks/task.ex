defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker3.Tasks.Task

  schema "tasks" do
    field(:body, :string)
    field(:completed, :boolean, default: false)
    field(:time_taken, :integer)
    field(:title, :string)
    belongs_to(:assigned, Tasktracker3.Users.User, foreign_key: :assigned_id)
    belongs_to(:user, Tasktracker3.Users.User, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :body, :time_taken, :assigned_id, :user_id, :completed])
    |> validate_required([:title, :body, :time_taken, :completed, :assigned_id, :user_id])
    |> validate_change(:time_taken, fn :time_taken, f ->
      if rem(f, 15) == 0 do
        []
      else
        [time_taken: "Invalid input, not a multiple of 15"]
      end
    end)
  end
end
