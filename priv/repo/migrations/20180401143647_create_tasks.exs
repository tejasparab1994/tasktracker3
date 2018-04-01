defmodule Tasktracker3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add(:title, :string, null: false)
      add(:body, :text, null: false)
      add(:time_taken, :integer, default: 0)
      add(:completed, :boolean, default: false, null: false)
      add(:assigned_id, references(:users, on_delete: :nilify_all), null: true)
      add(:user_id, references(:users, on_delete: :nilify_all), null: true)

      timestamps()
    end

    create(index(:tasks, [:assigned_id]))
    create(index(:tasks, [:user_id]))
  end
end
