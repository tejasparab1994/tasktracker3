defmodule Tasktracker3.Tasks do
  @moduledoc """
  The Tasks context.
  """

  import Ecto.Query, warn: false
  alias Tasktracker3.Repo

  alias Tasktracker3.Tasks.Task

  @doc """
  Returns the list of tasks.

  ## Examples

  iex> list_tasks()
  [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
    |> Repo.preload(:user)
    |> Repo.preload(:assigned)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

  iex> get_task!(123)
  %Task{}

  iex> get_task!(456)
  ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
    Repo.get!(Task, id)
    # |> Repo.preload(:user)
    # |> Repo.preload(:assigned)
  end

  @doc """
  Creates a task.

  ## Examples

  iex> create_task(%{field: value})
  {:ok, %Task{}}

  iex> create_task(%{field: bad_value})
  {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    case %Task{} |> Task.changeset(attrs) |> Repo.insert() do
      {:ok, task} ->
        {:ok,
         Repo.preload(task, :assigned)
         |> Repo.preload(:user)}

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Updates a task.

  ## Examples

  iex> update_task(task, %{field: new_value})
  {:ok, %Task{}}

  iex> update_task(task, %{field: bad_value})
  {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    # IO.inspect task
    case task
         |> Task.changeset(attrs)
         |> Repo.update() do
      {:ok, new_task} ->
        {:ok, new_task |> Repo.preload(:user) |> Repo.preload(:assigned)}

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Deletes a Task.

  ## Examples

  iex> delete_task(task)
  {:ok, %Task{}}

  iex> delete_task(task)
  {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

  iex> change_task(task)
  %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end
end
