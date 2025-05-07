defmodule ServerElixir.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ServerElixirWeb.Telemetry,
      ServerElixir.Repo,
      {DNSCluster, query: Application.get_env(:server_elixir, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ServerElixir.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: ServerElixir.Finch},
      # Start a worker by calling: ServerElixir.Worker.start_link(arg)
      # {ServerElixir.Worker, arg},
      # Start to serve requests, typically the last entry
      ServerElixirWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ServerElixir.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ServerElixirWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
