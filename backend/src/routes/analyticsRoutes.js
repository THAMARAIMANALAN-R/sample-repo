import { Router } from 'express';
import { getDashboardAnalytics, getRiskOverview } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', getDashboardAnalytics);
router.get('/risk', getRiskOverview);

export default router;
