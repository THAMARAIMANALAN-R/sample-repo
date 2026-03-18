import { Router } from 'express';
import { assignMemberToProject, getTeamWorkload } from '../controllers/teamController.js';

const router = Router();

router.get('/workload', getTeamWorkload);
router.post('/assign', assignMemberToProject);

export default router;
