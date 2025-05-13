# Emissio - Node.js Backend Server

This is the Node.js backend server for the Emissio application. It provides a RESTful API for managing CO2 emission activities.

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   You have installed [Node.js](https://nodejs.org/) (which includes npm). It is recommended to use the latest LTS version.

## Installation

To install the project dependencies, navigate to the `server_node` directory and run:

```bash
npm install
```

## Running the Server

To start the development server, run the following command from the `server_node` directory:

```bash
npm run start
```

This will typically start the server on `http://localhost:3456` (or the port specified in your environment configuration).

## Running Tests

To run the automated tests for the server, use the following command from the `server_node` directory:

```bash
npm run test
```

This will execute the Jest test suite.

## Project Structure

The server code is organized as follows within the `src` directory:

*   `src/index.ts`: The main entry point for the application.
*   `src/controllers/`: Handles incoming HTTP requests and sends responses.
*   `src/services/`: Contains the business logic of the application.
*   `src/routes/`: Defines the API routes and maps them to controllers.
*   `src/models/`: Defines the data structures (e.g., for database entities).
*   `src/db/`: Handles database connections and interactions.

The tests are located in the `tests` directory, mirroring the structure of the `src` directory.
