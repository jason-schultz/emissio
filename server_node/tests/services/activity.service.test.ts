import { ActivityService } from '../../src/services/activity.service';
import { ActivityListResult, ActivityResult } from '../../src/models/activity.model';
import { beforeEach, describe, it, expect} from '@jest/globals';
import Database from 'better-sqlite3';

let db: Database.Database;
let service: ActivityService;

beforeEach(() => {
    db = new Database(':memory:');
    service = new ActivityService(db);
    // db.prepare(`DELETE FROM activities`).run();

    db.prepare(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            co2e REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    `).run();
});

describe('ActivityService', () => {
    it('should create a new activity', () => {
        const result: ActivityResult = service.create('Test Activity', 5.5);
        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data).toMatchObject({
                type: 'Test Activity',
                co2e: 5.5
            });
        }
    });

    it('should not create activity with missing type', () => {
        const result: ActivityResult = service.create('', 3.3);
        expect(result.success).toBe(false);
    });

    it('should return all activities', () => {
        service.create('A', 1.1);
        service.create('B', 2.2);

        const result: ActivityListResult = service.getAll();
        expect(result.success).toBe(true);

        if (result.success) {
            expect(Array.isArray(result.data)).toBe(true);
            expect(result.data.length).toBe(2);
        }
    });

    it('should return empty list if no data', () => {
        const result: ActivityListResult = service.getAll();
        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data).toEqual([]);
        }
    });
});
