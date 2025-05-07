defmodule ServerElixir.Repo do
  use Ecto.Repo,
    otp_app: :server_elixir,
    adapter: Ecto.Adapters.SQLite3
end
