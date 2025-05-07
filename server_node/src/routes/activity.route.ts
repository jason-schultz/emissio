import { Router } from 'express';
import { ActivityController } from '../controllers/activity.controller';

const router = Router();

router.get('/activities', ActivityController.getAll);
router.post('/activities', ActivityController.create);

export default router;