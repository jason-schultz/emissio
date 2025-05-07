defmodule ServerElixir.ActivitiesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ServerElixir.Activities` context.
  """

  @doc """
  Generate a activity.
  """
  def activity_fixture(attrs \\ %{}) do
    {:ok, activity} =
      attrs
      |> Enum.into(%{
        co2e: 120.5,
        timestamp: ~U[2025-05-06 19:07:00Z],
        type: "some type"
      })
      |> ServerElixir.Activities.create_activity()

    activity
  end
end
