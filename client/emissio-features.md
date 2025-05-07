🌿 Emissio – High-Level Feature List
🔹 1. Activity Logging

Allow users to log daily/weekly activities that contribute to carbon emissions.

Categories: Transportation, Electricity, Heating, Food, Waste, Travel, etc.
Fields: Activity type, quantity (e.g. km driven, kWh used), date, and optional notes.
Backend assigns a carbon multiplier and calculates estimated CO₂e.
🔹 2. Dashboard & Visualization

Visual overview of personal emissions over time.

Emissions by category (bar/pie chart).
Emissions over time (line chart).
Monthly/weekly totals and percentage changes.
🔹 3. Emission Goals (Optional Stretch)

Set reduction targets and compare actual vs goal.

Visual feedback on progress.
Encourage sustainable behavior (e.g., “You're 20% below your usual driving emissions this week!”).
🔹 4. Recent Activity Feed

Show a list of recently logged activities with emissions.

Display emission impact (e.g., "🚗 Drove 50 km = 10.5 kg CO₂e").
Option to delete/edit an entry.
🔹 5. Responsive UI

Mobile-first design with clean layout.
Light/dark mode (optional polish).
🔹 6. Mock Authentication (Optional)

Simulate login to demonstrate routing guards and session management.

Not required to integrate real auth for demo.
🧱 Bonus: Architecture & Technical Goals
Angular 17+ with Signals or RxJS for state management.
Feature modules for scalability.
Service layer abstraction (e.g., CarbonService).
Reusable components: ActivityFormComponent, SummaryCardComponent, ChartComponent, etc.
Strong separation of concerns between UI, logic, and data access.
JSON-based mock backend or connect a small Node.js / Rust API (if you want to go fullstack).