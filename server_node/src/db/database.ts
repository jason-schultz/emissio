import Database from 'better-sqlite3';

const db = new Database('./data/emissio.db', { verbose: console.log });

db.prepare(`
    CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        co2e REAL NOT NULL,
        timestamp TEXT NOT NULL
    )
`).run();

export default db;