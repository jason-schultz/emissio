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
    activity = Activities.get_activity(id)
    attrs = Map.merge(params, %{"timestamp" => DateTime.utc_now()})

    case Activities.update_activity(
           activity,
           attrs
         ) do
      {:ok, activity} ->
        render(conn, :show, data: activity)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(ServerElixirWeb.ErrorJSON)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    case Activities.delete_activity(id) do
      {:ok, _activity} ->
        conn
        |> put_status(:no_content)
        |> render(:no_content)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(ServerElixirWeb.ErrorJSON)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    case Activities.get_activity(id) do
      activity ->
        render(conn, :show, data: activity)

      _ ->
        conn
        |> put_status(:not_found)
        |> put_view(ServerElixirWeb.ErrorJSON)
        |> render(:not_found_error, message: "Activity not found")
    end
  end
end
