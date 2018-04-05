# Tasktracker

## Design Decisions:
	* Clicking submit on the registration page keeps the user on the same page
	* Clicking on the login button renders the feed and other tabs
	* On logging in, the first page that opens is the feed page
	* Only the person who has been assigned the task and the assignee can edit the task
	* Time taken cannot be left empty while creating a task, some value needs to be entered, if beginning a task, enter 0 	to mark the beginning.
	* The task creator is also not allowed to edit or delete the tasks, only the assigned user may edit and delete and no one else.
	* Deleting of users is not allowed in the application.
	* Input of any number other than a multiple of 15 in the time taken field of a new/edit task would result in an error message of "Invalit input, not a multiple of 15".
	* Leaving the completed field empty means the task is incomplete.
	* No fields are optional while creating tasks. All the fields must be filled.
	
	

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
