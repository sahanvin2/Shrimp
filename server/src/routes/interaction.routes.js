import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.post('/:id/like', (req, res) => ok(res, true));
router.post('/:id/pin', (req, res) => ok(res, true));

export default router;
