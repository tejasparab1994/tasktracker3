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
    p = Comeonin.Argon2.hashpwsalt("password1")

    Repo.delete_all(User)
    a = Repo.insert!(%User{name: "alice", password_hash: p})
    b = Repo.insert!(%User{name: "bob", password_hash: p})
    c = Repo.insert!(%User{name: "carol", password_hash: p})
    d = Repo.insert!(%User{name: "dave", password_hash: p})

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
      body: "assigned to Dave",
      time_taken: 30,
      completed: true
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
