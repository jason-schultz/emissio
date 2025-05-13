defmodule ServerElixirWeb.ActivityControllerTest do
  use ServerElixirWeb.ConnCase, async: true

  alias ServerElixir.Activities
  # Assuming you have this alias
  alias ServerElixir.Activities.Activity

  @valid_attrs %{type: "transportation", co2e: 10.5}
  @update_attrs %{type: "electricity", co2e: 5.2}
  @invalid_attrs %{type: nil, co2e: nil}

  # Helper to create an activity directly for setup
  defp create_activity_fixture(attrs \\ @valid_attrs) do
    {:ok, activity} = Activities.create_activity(attrs)
    activity
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "GET /api/activities (index)" do
    test "returns empty list initially", %{conn: conn} do
      conn = get(conn, ~p"/api/activities")

      assert %{
               "success" => true,
               "data" => []
             } == json_response(conn, 200)
    end

    test "lists all activities", %{conn: conn} do
      activity = create_activity_fixture()
      conn = get(conn, ~p"/api/activities")

      id = activity.id
      type = activity.type
      co2e = activity.co2e

      assert %{
               "success" => true,
               "data" => [
                 %{
                   "id" => ^id,
                   "type" => ^type,
                   "co2e" => ^co2e,
                   "timestamp" => _
                 }
               ]
             } = json_response(conn, 200)
    end
  end

  describe "POST /api/activities (create)" do
    test "creates a new activity and returns it", %{conn: conn} do
      conn = post(conn, ~p"/api/activities", @valid_attrs)
      response_data = json_response(conn, 201)

      assert response_data["success"] == true
      assert %{"id" => id, "type" => "transportation", "co2e" => 10.5} = response_data["data"]

      # Verify by fetching the created activity
      conn = get(conn, ~p"/api/activities/#{id}")

      assert %{
               "success" => true,
               "data" => %{
                 "id" => ^id,
                 "type" => "transportation",
                 "co2e" => 10.5,
                 "timestamp" => _
               }
             } = json_response(conn, 200)
    end

    test "returns error when invalid data is provided for create", %{conn: conn} do
      conn = post(conn, ~p"/api/activities", @invalid_attrs)
      response = json_response(conn, 422)
      assert response["success"] == false
      assert response["errors"] != %{}
    end
  end

  describe "GET /api/activities/:id (show)" do
    test "returns the activity when it exists", %{conn: conn} do
      activity = create_activity_fixture()
      conn = get(conn, ~p"/api/activities/#{activity.id}")
      response_data = json_response(conn, 200)

      assert response_data["success"] == true

      id = activity.id
      type = activity.type
      co2e = activity.co2e

      assert %{
               "id" => ^id,
               "type" => ^type,
               "co2e" => ^co2e,
               "timestamp" => _
             } = response_data["data"]
    end

    test "returns 404 when activity does not exist", %{conn: conn} do
      # Non-existent ID
      conn = get(conn, ~p"/api/activities/99999")
      response_data = json_response(conn, 404)
      # As per our ErrorJSON.render_not_found
      assert response_data["data"] == []
      assert response_data["message"] == "Activity not found"
    end
  end

  describe "PUT /api/activities/:id (update)" do
    test "updates the activity with valid data", %{conn: conn} do
      activity = create_activity_fixture()
      conn = put(conn, ~p"/api/activities/#{activity.id}", @update_attrs)
      # Assuming update returns 200 OK
      response_data = json_response(conn, 200)

      assert response_data["success"] == true

      assert %{
               "id" => _,
               "type" => "electricity",
               "co2e" => 5.2,
               # Timestamp might be updated
               "timestamp" => _
             } = response_data["data"]

      # Verify changes by fetching again
      conn_get = get(conn, ~p"/api/activities/#{activity.id}")
      assert %{"type" => "electricity", "co2e" => 5.2} = json_response(conn_get, 200)["data"]
    end

    test "returns error when updating with invalid data", %{conn: conn} do
      activity = create_activity_fixture()
      conn = put(conn, ~p"/api/activities/#{activity.id}", @invalid_attrs)
      response = json_response(conn, 422)
      assert response["success"] == false
      assert response["errors"] != %{}
    end

    test "returns 404 when updating a non-existent activity", %{conn: conn} do
      conn = put(conn, ~p"/api/activities/99999", @update_attrs)
      response_data = json_response(conn, 404)
      assert response_data["data"] == []
      # Or your generic resource not found
      assert response_data["message"] == "Activity not found"
    end
  end

  describe "DELETE /api/activities/:id (delete)" do
    test "deletes the activity and returns 204", %{conn: conn} do
      activity = create_activity_fixture()
      conn = delete(conn, ~p"/api/activities/#{activity.id}")
      # No content
      assert response(conn, 204) == ""

      # Verify it's gone by trying to fetch it
      conn_get = get(conn, ~p"/api/activities/#{activity.id}")
      assert json_response(conn_get, 404)["message"] == "Activity not found"
    end

    test "returns 404 when deleting a non-existent activity", %{conn: conn} do
      conn = delete(conn, ~p"/api/activities/99999")
      response_data = json_response(conn, 404)
      assert response_data["data"] == []
      assert response_data["message"] == "Activity not found"
    end
  end
end
