# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker3.Repo.insert!(%Tasktracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktracker3.Repo
  alias Tasktracker3.Users.User
  alias Tasktracker3.Tasks.Task

  def run do
    Repo.delete_all(User)
    a = Repo.insert!(%User{name: "alice"})
    b = Repo.insert!(%User{name: "bob"})
    c = Repo.insert!(%User{name: "carol"})
    d = Repo.insert!(%User{name: "dave"})

    Repo.delete_all(Task)

    Repo.insert!(%Task{
      user_id: a.id,
      assigned_id: b.id,
      title: "Hi, created by Alice",
      body: "assigned to bob"
    })

    Repo.insert!(%Task{
      user_id: b.id,
      assigned_id: a.id,
      title: "Hi, created by Bob",
      body: "assigned to alice"
    })

    Repo.insert!(%Task{
      user_id: b.id,
      assigned_id: c.id,
      title: "Hi, created by Bob",
      body: "assigned to carol"
    })

    Repo.insert!(%Task{
      user_id: c.id,
      assigned_id: d.id,
      title: "Hi, created by Carol",
      body: "assigned to Dave"
    })

    Repo.insert!(%Task{
      user_id: d.id,
      assigned_id: b.id,
      title: "Hi, created by Dave",
      body: "assigned to bob"
    })
  end
end

Seeds.run()
