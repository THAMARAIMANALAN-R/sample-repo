import { Router } from 'express';
import { createWeeklyPlan, getWeeklyPlans } from '../controllers/plannerController.js';

const router = Router();

router.get('/', getWeeklyPlans);
router.post('/', createWeeklyPlan);

export default router;
