import { Database as DatabaseType } from 'better-sqlite3';
import { Activity, ActivityListResult, ActivityResult } from '../models/activity.model';

export class ActivityService {
    constructor(private db: DatabaseType) { }

    delete(id: number): ActivityResult {
        try {
            const result = this.db.prepare('DELETE FROM activities WHERE id = ?').run(id);
            if (result.changes === 0) {
                return { success: false, error: 'Activity not found' };
            }
            return { success: true, data: null };
        }
        catch (error) {
            console.error('Error deleting activity:', error);
            return { success: false, error: 'Failed to delete activity' };
        }
    }

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

    getById(id: number): ActivityResult {
        try {
            const row = this.db.prepare('SELECT * FROM activities WHERE id = ?').get(id);
            if (!row) {
                return { success: false, error: 'Activity not found' };
            }
            return { success: true, data: row as Activity };
        }
        catch (error) {
            console.error('Error fetching activity by ID:', error);
            return { success: false, error: 'Failed to fetch activity' };
        }
    }



    create(type: string, co2e: number): ActivityResult {
        try {
            if (co2e <= 0) {
                return { success: false, error: 'CO2e must be a positive number' };
            }

            if (type.length === 0) {
                return { success: false, error: 'Type must be a non-empty string' };
            }

            if (!type || typeof co2e !== 'number') {
                console.error('Invalid input data:', { type, co2e });
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

    update = (id: number, attrs: Omit<Activity, 'id' | 'timestamp'>): ActivityResult => {
        const { type, co2e } = attrs;
        try {
            if (co2e <= 0) {
                return { success: false, error: 'CO2e must be a positive number' };
            }
            if (type.length === 0) {
                return { success: false, error: 'Type must be a non-empty string' };
            }

            if (!type || typeof co2e !== 'number') {
                throw new Error('Invalid input data');
            }

            const result = this.db.prepare('UPDATE activities SET type = ?, co2e = ? WHERE id = ?').run(type, co2e, id);

            if (result.changes === 0) {
                return { success: false, error: 'Activity not found' };
            }

            const updatedActivity = {
                id,
                type,
                co2e,
                timestamp: new Date().toISOString()
            };

            return { success: true, data: updatedActivity };
        }
        catch (error) {
            console.error('Error updating activity:', error);
            return { success: false, error: 'Failed to update activity' };
        }
    }

}