import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { searchAll } from '../services/search.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    return ok(res, await searchAll(req.query.q), { cursor: null, total: 0 });
  } catch (error) {
    return next(error);
  }
});

export default router;
