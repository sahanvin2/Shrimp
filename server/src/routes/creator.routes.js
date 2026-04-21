import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listCreators } from '../services/mockStore.js';

const router = Router();

router.get('/', (req, res) => ok(res, listCreators()));

export default router;
