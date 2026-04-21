import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.get('/analytics/overview', (req, res) => ok(res, { views: 0, subscribers: 0, likes: 0, watchTime: 0 }));
router.get('/analytics/video/:id', (req, res) => ok(res, { id: req.params.id, views: 0 }));
router.get('/videos', (req, res) => ok(res, []));

export default router;
