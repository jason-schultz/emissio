defmodule ServerElixir.Repo.Migrations.CreateActivities do
  use Ecto.Migration

  def change do
    create table(:activities) do
      add :type, :string
      add :co2e, :float
      add :timestamp, :utc_datetime

      timestamps(type: :utc_datetime)
    end
  end
end
