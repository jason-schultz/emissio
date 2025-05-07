import {Request, Response} from 'express';
import { ActivityService } from '../services/activity.service';

export class ActivityController {
    static getAll(req: Request, res: Response): void {
        const activities = ActivityService.getAll();
        res.json(activities);
    }

    static create(req: Request, res: Response): void {
        const { type, co2e } = req.body;
        const activity = ActivityService.create(type, co2e);
        res.status(201).json(activity);
    }
}