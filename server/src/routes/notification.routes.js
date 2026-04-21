import { Router } from 'express';
import { ok } from '../controllers/index.js';

const router = Router();

router.get('/', (req, res) => ok(res, []));
router.post('/read-all', (req, res) => ok(res, true));

export default router;
