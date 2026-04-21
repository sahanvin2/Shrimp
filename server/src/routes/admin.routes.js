import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.get('/users', (req, res) => ok(res, []));
router.put('/users/:id/ban', (req, res) => ok(res, true));
router.get('/reports', (req, res) => ok(res, []));
router.put('/reports/:id', (req, res) => ok(res, true));

export default router;
