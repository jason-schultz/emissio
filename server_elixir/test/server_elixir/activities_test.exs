defmodule ServerElixir.ActivitiesTest do
  use ServerElixir.DataCase

  alias ServerElixir.Activities

  describe "activities" do
    alias ServerElixir.Activities.Activity

    import ServerElixir.ActivitiesFixtures

    @invalid_attrs %{timestamp: nil, type: nil, co2e: nil}

    test "list_activities/0 returns all activities" do
      activity = activity_fixture()
      assert Activities.list_activities() == [activity]
    end

    test "get_activity!/1 returns the activity with given id" do
      activity = activity_fixture()
      assert Activities.get_activity!(activity.id) == activity
    end

    test "create_activity/1 with valid data creates a activity" do
      valid_attrs = %{timestamp: ~U[2025-05-06 19:07:00Z], type: "some type", co2e: 120.5}

      assert {:ok, %Activity{} = activity} = Activities.create_activity(valid_attrs)
      assert activity.timestamp == ~U[2025-05-06 19:07:00Z]
      assert activity.type == "some type"
      assert activity.co2e == 120.5
    end

    test "create_activity/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Activities.create_activity(@invalid_attrs)
    end

    test "update_activity/2 with valid data updates the activity" do
      activity = activity_fixture()
      update_attrs = %{timestamp: ~U[2025-05-07 19:07:00Z], type: "some updated type", co2e: 456.7}

      assert {:ok, %Activity{} = activity} = Activities.update_activity(activity, update_attrs)
      assert activity.timestamp == ~U[2025-05-07 19:07:00Z]
      assert activity.type == "some updated type"
      assert activity.co2e == 456.7
    end

    test "update_activity/2 with invalid data returns error changeset" do
      activity = activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Activities.update_activity(activity, @invalid_attrs)
      assert activity == Activities.get_activity!(activity.id)
    end

    test "delete_activity/1 deletes the activity" do
      activity = activity_fixture()
      assert {:ok, %Activity{}} = Activities.delete_activity(activity)
      assert_raise Ecto.NoResultsError, fn -> Activities.get_activity!(activity.id) end
    end

    test "change_activity/1 returns a activity changeset" do
      activity = activity_fixture()
      assert %Ecto.Changeset{} = Activities.change_activity(activity)
    end
  end
end
