defmodule Tasktracker3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:name, :string)
    field(:password_hash, :string)

    field(:password, :string, virtual: true)
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :password_hash])
    |> put_hash
    |> validate_required([:name, :password_hash])
    |> unique_constraint(:name)
  end

  defp put_hash(%Ecto.Changeset{valid?: true, changes: %{password_hash: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end

  defp put_pass_hash(changeset), do: changeset
end
