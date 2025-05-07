defmodule ServerElixirWeb.ActivityController do
  use ServerElixirWeb, :controller

  alias ServerElixir.Activities
  alias ServerElixir.Activities.Activity

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
        |> render(ServerElixirWeb.ErrorJSON, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    case Activities.get_activity!(id) do
      activity ->
        render(conn, :show, data: activity)

      nil ->
        conn
        |> put_status(:not_found)
        |> render(ServerElixirWeb.ErrorJSON, "error.json", message: "Activity not found")
    end
  end
end
