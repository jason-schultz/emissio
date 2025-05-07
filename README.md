# 🌱 Emissio

**Emissio** is a demo project built to learn and showcase modern **Angular** application development. It allows individuals to track their **carbon emissions** based on everyday activities and visualize where they might reduce their personal CO₂ output.

The project is designed to be both a technical learning tool and a starting point for further development around sustainability tracking.

---

## 🧩 Features

- Track carbon-emitting activities (e.g. driving, electricity use)
- View total weekly/monthly emissions
- See top sources of emissions
- View charts and recent activity logs
- Designed for responsiveness and modular component reuse
- Built with Angular 19 and standalone component architecture

---

## 🔁 Dual Backend Support

This project includes **two backend implementations**:

| Backend     | Tech Stack | Purpose                                       |
|-------------|------------|-----------------------------------------------|
| `server_elixir` | Elixir + Phoenix | Preferred backend for development (author’s choice) |
| `server_node`   | Node.js + TypeScript + SQLite | Alternative backend for accessibility or preference |

You can run **either** backend and choose which to connect to from the Angular frontend.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Elixir](https://elixir-lang.org/) (for Phoenix backend)
- [npm](https://www.npmjs.com/) / [pnpm](https://pnpm.io/) for managing frontend

---

### 📦 1. Install Angular Frontend

```bash
cd client
npm install
```

### 🖥 2. Start a Backend Server

### ▶️ To start the Elixir (Phoenix) backend:

```
cd server_elixir
mix deps.get
mix ecto.setup   # Creates and migrates the SQLite DB
mix phx.server
```

The Elixir backend runs at http://localhost:9876.

### To start the Node (TypeScript) backend:
```
cd server_node
npm install
npm start
```
The Node backend runs at http://localhost:3456.

### 3. Start Angular Frontend
Back in the client/ folder:
```
# To connect to the Node backend
npm run start:node

# To connect to the Elixir backend
npm run start:elixir
```

Make sure the backend server you want to use is running before starting the frontend.

### ⚙️ Configuration

The Angular app uses environment-based configs in:
```
src/environments/
├── environment.node.ts
├── environment.elixir.ts
```
These control the apiBaseUrl the app connects to.

### 🧠 Why Two Backends?

The project includes both:

Elixir (for those who prefer functional programming and Phoenix)
Node (for those who want a fast, typed JS-based API)
They provide the same API interface (/api/activities) and use SQLite for local persistence.

### 📌 Project Goals

Learn and showcase Angular 19 standalone architecture
Practice building a structured, scalable fullstack app
Demonstrate how clean services and modular components can be reused across views
Provide a realistic but approachable app for showcasing frontend/backend integration

### 📷 Screenshots

TODO: Add dashboard and chart screenshots here.

### 📄 License

MIT — use and modify as needed.

### Project Structure
```
emissio/
├── client/           # Angular frontend application
├── server_node/      # Node.js backend implementation
├── server_elixir/    # Elixir/Phoenix backend implementation
└── README.md
```