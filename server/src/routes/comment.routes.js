import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.put('/:commentId', (req, res) => ok(res, true));
router.delete('/:commentId', (req, res) => ok(res, true));
router.post('/:commentId/like', (req, res) => ok(res, true));
router.post('/:commentId/pin', (req, res) => ok(res, true));

export default router;
