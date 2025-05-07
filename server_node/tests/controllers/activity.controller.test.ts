import express, { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, it, expect } from '@jest/globals';
import { ActivityController } from '../../src/controllers/activity.controller';
import { ActivityService } from '../../src/services/activity.service';
import Database from 'better-sqlite3';

let app: Express;
let db: Database.Database;
let service: ActivityService;
let controller: ActivityController;

beforeEach(() => {
    db = new Database(':memory:');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            co2e REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
    `).run();
    service = new ActivityService(db);
    controller = new ActivityController(service);

    app = express();
    app.use(express.json());
    app.get('/activities', controller.getAll);
    app.post('/activities', controller.create);
});

describe('ActivityController', () => {
    it('should return 200 and an empty list when no activities exist', async () => {
        const res = await request(app).get('/activities');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ success: true, data: [] });
    });

    it('should create a new activity and return 201', async () => {
        const activity = { type: 'Test Activity', co2e: 5.5 };
        const res = await request(app).post('/activities').send(activity);
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toMatchObject({
            type: 'Test Activity',
            co2e: 5.5
        });
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data).toHaveProperty('timestamp');
    });

    it('should return 400 when creating activity with invalid data', async () => {
        const res = await request(app).post('/activities').send({ type: '', co2e: 3.3 });
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body).toHaveProperty('error');
    });

    it('should return 200 and all activities', async () => {
        // Create two activities
        await request(app).post('/activities').send({ type: 'A', co2e: 1.1 });
        await request(app).post('/activities').send({ type: 'B', co2e: 2.2 });

        const res = await request(app).get('/activities');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(2);

        // Check that both activities are present
        const types = res.body.data.map((a: any) => a.type);
        expect(types).toContain('A');
        expect(types).toContain('B');
    });

    // Add more tests as needed
});
