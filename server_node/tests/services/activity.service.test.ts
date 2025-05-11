import { ActivityService } from '../../src/services/activity.service';
import { ActivityListResult, ActivityResult } from '../../src/models/activity.model';
import { beforeEach, describe, it, expect } from '@jest/globals';
import Database from 'better-sqlite3';
import { fail } from 'assert';

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

    it('should not create activity with non-positive co2e', () => {
        const result: ActivityResult = service.create('Valid Type', -1);
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

    describe('getById', () => {
        it('should return an activity if found', () => {
            const createResult = service.create('Fetchable', 7.7);
            if (!createResult.success || !createResult.data) {
                fail('Setup for getById failed');
                return; // for type safety
            }
            const activityId = createResult.data.id;

            const result: ActivityResult = service.getById(activityId);
            expect(result.success).toBe(true);
            if (result.success && result.data) {
                expect(result.data.id).toBe(activityId);
                expect(result.data.type).toBe('Fetchable');
                expect(result.data.co2e).toBe(7.7);
            } else {
                fail('getById failed or data was null');
            }
        });

        it('should return error if activity not found', () => {
            const result: ActivityResult = service.getById(999); // Non-existent ID
            expect(result.success).toBe(false);
        });
    });

    describe('update', () => {
        it('should update an existing activity', () => {
            const createResult = service.create('Original Type', 10.0);
            if (!createResult.success || !createResult.data) {
                fail('Setup for update failed');
                return;
            }
            const activityId = createResult.data.id;
            const originalTimestamp = createResult.data.timestamp;

            const updateData = { type: 'Updated Type', co2e: 20.5 };
            const updateResult: ActivityResult = service.update(activityId, updateData);

            expect(updateResult.success).toBe(true);
            if (updateResult.success && updateResult.data) {
                expect(updateResult.data.id).toBe(activityId);
                expect(updateResult.data.type).toBe('Updated Type');
                expect(updateResult.data.co2e).toBe(20.5);
                // Assuming timestamp is updated by the service on update
                // expect(updateResult.data.timestamp).not.toBe(originalTimestamp); /
            } else {
                fail('update failed or data was null');
            }

            // Verify by fetching again
            const fetchResult = service.getById(activityId);
            if (fetchResult.success && fetchResult.data) {
                expect(fetchResult.data.type).toBe('Updated Type');
                expect(fetchResult.data.co2e).toBe(20.5);
            } else {
                fail('Post-update fetch failed');
            }
        });

        it('should return error if updating a non-existent activity', () => {
            const result: ActivityResult = service.update(999, { type: 'NonExistent', co2e: 0 });
            expect(result.success).toBe(false);
        });

        it('should not update with invalid data (e.g., empty type)', () => {
            const createResult = service.create('Valid', 5.0);
            if (!createResult.success || !createResult.data) {
                fail('Setup for invalid update failed');
                return;
            }
            const activityId = createResult.data.id;

            const result: ActivityResult = service.update(activityId, { type: '', co2e: 5.0 });
            expect(result.success).toBe(false);
            // Assuming your service validates this, adjust error message as needed
        });

        it('should not update with non-positive co2e', () => {
            const createResult = service.create('Valid', 5.0);
            if (!createResult.success || !createResult.data) {
                fail('Setup for invalid update failed');
                return;
            }
            const activityId = createResult.data.id;
            const result: ActivityResult = service.update(activityId, { type: '', co2e: -1 });
            expect(result.success).toBe(false);
        });
    });

    describe('delete', () => {
        it('should delete an existing activity', () => {
            const createResult = service.create('To Be Deleted', 3.0);
            if (!createResult.success || !createResult.data) {
                fail('Setup for delete failed');
                return;
            }
            const activityId = createResult.data.id;

            const deleteResult: ActivityResult = service.delete(activityId);
            expect(deleteResult.success).toBe(true);
            // expect(deleteResult.data).toBeNull(); // Or whatever your service returns on successful delete

            // Verify it's gone
            const fetchResult = service.getById(activityId);
            expect(fetchResult.success).toBe(false);
            // expect(fetchResult.error).toBe('Activity not found');
        });

        it('should return error if deleting a non-existent activity', () => {
            const result: ActivityResult = service.delete(999);
            expect(result.success).toBe(false);
            // expect(result.error).toBe('Activity not found');
        });
    });
});
