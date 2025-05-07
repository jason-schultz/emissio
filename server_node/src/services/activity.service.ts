import db from '../db/database';
import { Activity } from '../models/activity.model';

export class ActivityService {
    static getAll(): Activity[] {
        return db.prepare('SELECT * FROM activities ORDER BY timestamp DESC').all() as Activity[];
    }

    static create(type: string, co2e: number): Activity {
        const timestamp = new Date().toISOString();
        const result = db.prepare('INSERT INTO activities (type, co2e, timestamp) VALUES (?, ?, ?)').run(type, co2e, timestamp);

        return {
            id: result.lastInsertRowid as number,
            type,
            co2e,
            timestamp
        };
    }
}