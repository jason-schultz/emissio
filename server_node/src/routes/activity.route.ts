import { Router } from 'express';
import { ActivityController } from '../controllers/activity.controller';
import { ActivityService } from '../services/activity.service';
import db from '../db/database';

const router = Router();
const activityService = new ActivityService(db);
const activityController = new ActivityController(activityService);

router.get('/activities', activityController.getAll);
router.post('/activities', activityController.create);

export default router;