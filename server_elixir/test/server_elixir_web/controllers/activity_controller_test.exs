defmodule ServerElixirWeb.ActivityControllerTest do
  use ServerElixirWeb.ConnCase, async: true

  alias ServerElixir.Activities
  alias ServerElixir.Activities.Activity

  @valid_attrs %{
    type: "transportation",
    co2e: 10.5
  }

  describe "GET /api/activities" do
    test "returns empty list initially", %{conn: conn} do
      conn = get(conn, ~p"/api/activities")

      assert %{
               "success" => true,
               "data" => []
             } == json_response(conn, 200)
    end
  end

  describe "POST /api/activities" do
    test "creates a new activity and returns it", %{conn: conn} do
      conn = post(conn, ~p"/api/activities", @valid_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/activities/#{id}")

      assert %{
               "success" => true,
               "data" => %{
                 "id" => ^id,
                 "type" => "transportation",
                 "co2e" => 10.5,
                 "timestamp" => _timestamp
               }
             } = json_response(conn, 200)
    end

    test "returns error when invalid data is provided", %{conn: conn} do
      conn = post(conn, ~p"/api/activities", %{type: nil, co2e: nil})
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "GET after POST" do
    test "returns inserted activity", %{conn: conn} do
      post(conn, ~p"/api/activities", @valid_attrs)
      conn = get(conn, ~p"/api/activities")

      assert %{
               "success" => true,
               "data" => [
                 %{
                   "id" => _id,
                   "type" => "transportation",
                   "co2e" => 10.5,
                   "timestamp" => _timestamp
                 }
               ]
             } = json_response(conn, 200)
    end
  end
end
