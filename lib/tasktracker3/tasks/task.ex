defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :body, :string
    field :completed, :boolean, default: false
    field :time_taken, :integer
    field :title, :string
    field :assigned_id, :id
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :body, :time_taken, :completed])
    |> validate_required([:title, :body, :time_taken, :completed])
  end
end
