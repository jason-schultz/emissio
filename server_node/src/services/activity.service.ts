import { Database as DatabaseType } from 'better-sqlite3';
import { Activity, ActivityListResult, ActivityResult } from '../models/activity.model';

export class ActivityService {
    constructor(private db: DatabaseType) { }

    getAll(): ActivityListResult {
        try {
            const rows = this.db.prepare('SELECT * FROM activities ORDER BY timestamp DESC').all();
            return { success: true, data: rows as Activity[] };
        }
        catch (error) {
            console.error('Error fetching activities:', error);
            return { success: false, error: 'Failed to fetch activities' };
        }
    }

    create(type: string, co2e: number): ActivityResult {
        try {
            if (!type || typeof co2e !== 'number') {
                throw new Error('Invalid input data');
            }

            const timestamp = new Date().toISOString();

            const result = this.db.prepare('INSERT INTO activities (type, co2e, timestamp) VALUES (?, ?, ?)').run(type, co2e, timestamp);

            const activity = {
                id: result.lastInsertRowid as number,
                type,
                co2e,
                timestamp
            };

            return { success: true, data: activity };
        }
        catch (error) {
            console.error('Error creating activity:', error);
            return { success: false, error: 'Failed to create activity' };
        }
    }
}