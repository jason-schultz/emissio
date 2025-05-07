import { Request, Response } from 'express';
import { ActivityService } from '../services/activity.service';

export class ActivityController {
    constructor(private activityService: ActivityService) { }

    getAll = (req: Request, res: Response): void => {
        const result = this.activityService.getAll();
        if (result.success === false) {
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    }

    create = (req: Request, res: Response): void => {
        const { type, co2e } = req.body;
        const result = this.activityService.create(type, co2e);
        if (result.success === false) {
            res.status(400).json(result);
            return;
        }
        res.status(201).json(result);
    }
}