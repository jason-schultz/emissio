defmodule ServerElixirWeb.ActivityController do
  use ServerElixirWeb, :controller

  alias ServerElixir.Activities

  def index(conn, _params) do
    activities = Activities.list_activities()
    render(conn, :index, data: activities)
  end

  def create(conn, %{"type" => type, "co2e" => co2e}) do
    attrs = %{
      type: type,
      co2e: co2e,
      timestamp: DateTime.utc_now()
    }

    case Activities.create_activity(attrs) do
      {:ok, activity} ->
        conn
        |> put_status(:created)
        |> render(:show, data: activity)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(ServerElixirWeb.ErrorJSON)
        |> render("error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id} = params) do
    # Attempt to fetch the activity first
    case Activities.get_activity(id) do
      nil ->
        # Activity not found, return 404
        conn
        |> put_status(:not_found)
        # Ensure this view is set up for :not_found
        |> put_view(ServerElixirWeb.ErrorJSON)
        # Or your generic not_found render
        |> render(:not_found, message: "Activity not found")

      activity ->
        update_attrs = Map.merge(params, %{"timestamp" => DateTime.utc_now()})

        case Activities.update_activity(activity, update_attrs) do
          {:ok, updated_activity} ->
            render(conn, :show, data: updated_activity)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> put_view(ServerElixirWeb.ErrorJSON)
            |> render("error.json", changeset: changeset)
        end
    end
  end

  def delete(conn, %{"id" => id}) do
    case Activities.get_activity(id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> put_view(ServerElixirWeb.ErrorJSON)
        # Assuming you have a :not_found or :render_not_found in ErrorJSON
        |> render(:not_found, message: "Activity not found")

      activity ->
        case Activities.delete_activity(activity) do
          {:ok, _deleted_activity} ->
            conn
            |> put_status(:no_content)
            # Send the response without rendering a view
            |> send_resp(:no_content, "")

          # Assuming delete_activity might return a changeset on error
          {:error, _changeset} ->
            conn
            # Or :unprocessable_entity if it's a validation error
            |> put_status(:internal_server_error)
            |> put_view(ServerElixirWeb.ErrorJSON)
            # Or use changeset
            |> render("error.json", message: "Failed to delete activity")
        end
    end
  end

  def show(conn, %{"id" => id}) do
    case Activities.get_activity(id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> put_view(ServerElixirWeb.ErrorJSON)
        |> render(:not_found, message: "Activity not found")

      activity ->
        render(conn, :show, data: activity)
    end
  end
end
