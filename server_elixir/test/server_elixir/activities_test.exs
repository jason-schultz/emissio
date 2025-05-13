defmodule ServerElixir.ActivitiesTest do
  use ServerElixir.DataCase, async: true

  alias ServerElixir.Activities
  alias ServerElixir.Activities.Activity # Ensure this alias is correct

  @valid_attrs %{type: "transportation", co2e: 10.5}
  @update_attrs %{type: "electricity", co2e: 5.2}
  @invalid_attrs %{type: nil, co2e: nil} # Or more specific invalid attrs

  defp activity_fixture(attrs \\ %{}) do
    {:ok, activity} =
      attrs
      |> Enum.into(@valid_attrs) # Merge provided attrs with defaults
      |> Activities.create_activity()

    activity
  end

  describe "list_activities/0" do
    test "returns all activities" do
      activity = activity_fixture()
      assert Activities.list_activities() == [activity]
    end

    test "returns an empty list if no activities" do
      assert Activities.list_activities() == []
    end
  end

  describe "get_activity/1 and get_activity!/1" do
    test "get_activity/1 returns the activity if it exists" do
      activity = activity_fixture()
      assert Activities.get_activity(activity.id) == activity
    end

    test "get_activity/1 returns nil if activity does not exist" do
      assert Activities.get_activity(99999) == nil
    end

    test "get_activity!/1 returns the activity if it exists" do
      activity = activity_fixture()
      assert Activities.get_activity!(activity.id) == activity
    end

    test "get_activity!/1 raises if activity does not exist" do
      assert_raise Ecto.NoResultsError, fn ->
        Activities.get_activity!(99999)
      end
    end
  end

  describe "create_activity/1" do
    test "creates an activity with valid attributes" do
      assert {:ok, %Activity{type: "transportation", co2e: 10.5} = activity} =
               Activities.create_activity(@valid_attrs)

      # Verify timestamp is set (assuming it's auto-set on create)
      assert activity.timestamp != nil
    end

    test "returns error changeset with invalid attributes" do
      assert {:error, %Ecto.Changeset{} = changeset} = Activities.create_activity(@invalid_attrs)
      # Add more specific assertions about the changeset errors if needed
      assert errors_on(changeset) != %{}
    end
  end

  describe "update_activity/2" do
    test "updates an activity with valid attributes" do
      activity = activity_fixture()
      assert {:ok, %Activity{type: "electricity", co2e: 5.2} = updated_activity} =
               Activities.update_activity(activity, @update_attrs)

      # Optionally check if timestamp was updated if that's the behavior
      # assert updated_activity.timestamp != activity.timestamp
    end

    test "returns error changeset when updating with invalid attributes" do
      activity = activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Activities.update_activity(activity, @invalid_attrs)
    end

    # If update_activity expects an existing activity struct:
    # test "returns an error if trying to update a non-existent or invalid activity struct" do
    #   # This depends on how update_activity handles being passed nil or a non-persisted struct
    #   # For example, if it tries to use an ID from a nil struct, it might raise or return an error.
    #   # If it takes an ID directly, then test that scenario.
    # end
  end

  describe "delete_activity/1" do
    test "deletes an existing activity" do
      activity = activity_fixture()
      assert {:ok, %Activity{}} = Activities.delete_activity(activity)
      assert Activities.get_activity(activity.id) == nil
    end

    test "returns an error when trying to delete a non-existent activity" do
      # This depends on how delete_activity is implemented.
      # If it takes an activity struct, and you pass one that wasn't found:
      non_existent_activity_struct = %Activity{id: 999} # Or however you'd represent this
      assert {:error, _reason} = Activities.delete_activity(non_existent_activity_struct)
      # Or, if it takes an ID:
      # assert {:error, :not_found} = Activities.delete_activity_by_id(999)
    end
  end
end
