import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.post('/batch', (req, res) => ok(res, { accepted: Array.isArray(req.body?.events) ? req.body.events.length : 0 }));

export default router;
