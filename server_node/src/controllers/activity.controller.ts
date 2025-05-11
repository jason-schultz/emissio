import { Request, Response } from 'express';
import { ActivityService } from '../services/activity.service';

export class ActivityController {
    constructor(private activityService: ActivityService) { }

    delete = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid ID' });
            return;
        }
        const result = this.activityService.delete(id);
        if (result.success === false) {
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    }

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

    getById = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid ID' });
            return;
        }
        const result = this.activityService.getById(id);
        if (result.success === false) {
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    }

    update = (req: Request, res: Response): void => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid ID' });
            return;
        }
        const { type, co2e } = req.body;
        const result = this.activityService.update(id, { type, co2e });
        if (result.success === false) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
    }

}