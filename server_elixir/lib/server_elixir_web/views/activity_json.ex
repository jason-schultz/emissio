defmodule ServerElixirWeb.ActivityJSON do
  alias ServerElixir.Activities.Activity

  def index(%{data: activities}) when is_list(activities) do
    %{success: true, data: Enum.map(activities, &activity_json/1)}
  end

  def show(%{data: activity}) when is_nil(activity) do
    %{success: false, data: []}
  end

  def show(%{data: activity}) do
    %{success: true, data: activity_json(activity)}
  end

  defp activity_json(%Activity{} = activity) do
    %{
      id: activity.id,
      type: activity.type,
      co2e: activity.co2e,
      timestamp: activity.timestamp |> DateTime.to_iso8601()
    }
  end
end
