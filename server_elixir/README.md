# Emissio - Elixir Backend Server

This is the Elixir backend server for the Emissio application, built with the Phoenix framework. It provides a RESTful API for managing CO2 emission activities.

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   You have installed Erlang and Elixir.

### Installation on macOS/Linux (using asdf)

[asdf](https://asdf-vm.com/) is a recommended version manager for Erlang and Elixir.

1.  **Install asdf:** Follow the instructions on the [official asdf website](https://asdf-vm.com/guide/getting-started.html).
2.  **Add Elixir and Erlang plugins:**
    You should just need to do the asdf plugin add erlang, if that doesn't work, try adding the the url to corresponding git repo.
    ```bash
    asdf plugin add erlang # https://github.com/asdf-vm/asdf-erlang.git
    asdf plugin add elixir # https://github.com/asdf-vm/asdf-elixir.git
    ```
3.  **Install Erlang and Elixir versions:**
    Navigate to the `server_elixir` directory. This project includes a `.tool-versions` file which specifies the required Erlang and Elixir versions. `asdf` will automatically pick these up.
    Run:
    ```bash
    asdf install
    ```
    This command will install the versions specified in `.tool-versions` (e.g., `erlang 26.2.2` and `elixir 1.16.3-otp-26`).
    If you need to set these versions globally or for your current shell session, you can use:
    ```bash
    asdf global erlang <version>
    asdf global elixir <version>
    # or
    asdf local erlang <version> # creates/updates .tool-versions
    asdf local elixir <version> # creates/updates .tool-versions
    # or for the current shell session
    asdf shell erlang <version>
    asdf shell elixir <version>
    ```

### Installation on Windows

1.  **Install Erlang:**
    *   Download the Erlang installer from [Erlang/OTP official website](https://www.erlang.org/downloads).
    *   Run the installer and follow the on-screen instructions.
    *   Add the Erlang `bin` directory to your system's PATH environment variable (e.g., `C:\Program Files\erl<version>\bin`).
2.  **Install Elixir:**
    *   Download the Elixir installer from the [Elixir official website](https://elixir-lang.org/install.html#windows).
    *   Run the installer and follow the on-screen instructions. This will usually also add Elixir to your PATH.
3.  **Verify installation:**
    Open a new command prompt or PowerShell window and type:
    ```bash
    erl -version
    elixir --version
    ```
    You should see the installed versions of Erlang and Elixir.

## Project Setup

To get the server running locally:

1.  **Navigate to the project directory:**
    ```bash
    cd server_elixir
    ```
2.  **Install dependencies:**
    This will also install Hex (Elixir's package manager) and Rebar3 (Erlang's build tool) if they are not already present.
    ```bash
    mix setup
    ```
    This command is an alias that typically runs `mix deps.get` and `mix ecto.create` (if the database isn't created) among other things.

3.  **Set up the database:**
    If `mix setup` didn't create and migrate your database, or if you need to reset it:
    ```bash
    mix ecto.setup
    ```
    This command will create your database, load the schema, and run any pending migrations.
    To see a list of all Ecto tasks:
    ```bash
    mix help ecto
    ```
    To reset the database (drop, create, migrate, seed):
    ```bash
    mix ecto.reset
    ```
    There is also a custom Mix task to clear the database (useful for development):
    ```bash
    mix db_reset
    ```

## Running the Server

To start the Phoenix server:

*   Run `mix phx.server`
*   Or, to run inside an IEx (Interactive Elixir) session: `iex -S mix phx.server`

Now you can visit [`http://localhost:9876`](http://localhost:9876) (or the port configured in `config/dev.exs`) from your browser or API client.

## Running Tests

To run the automated tests for the server:

```bash
mix test
```

This will execute the ExUnit test suite.

Ready to run in production? Please [check the Phoenix deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official Phoenix website: https://www.phoenixframework.org/
  * Phoenix Guides: https://hexdocs.pm/phoenix/overview.html
  * Phoenix Docs: https://hexdocs.pm/phoenix
  * Elixir Forum (Phoenix section): https://elixirforum.com/c/phoenix-forum
  * Phoenix Source: https://github.com/phoenixframework/phoenix
  * Elixir Docs: https://elixir-lang.org/docs.html
