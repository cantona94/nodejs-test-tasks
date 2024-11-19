import { Router } from 'express';
import actionController from '../controller/action-controller.js';

const router = Router();

router.get('/action', actionController.getActionsWithPagination);
router.post('/action', actionController.createAction);

export default router;
