defmodule ServerElixir.Activities.Activity do
  use Ecto.Schema
  import Ecto.Changeset

  schema "activities" do
    field :timestamp, :utc_datetime
    field :type, :string
    field :co2e, :float

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(activity, attrs) do
    activity
    |> cast(attrs, [:type, :co2e, :timestamp])
    |> validate_required([:type, :co2e, :timestamp])
  end
end
