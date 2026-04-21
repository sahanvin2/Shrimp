import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { buildForYouFeed } from '../services/feedAlgorithm.service.js';
import { getTrendingBundle } from '../services/trending.service.js';

const router = Router();

router.get('/foryou', async (req, res, next) => {
  try {
    return ok(res, await buildForYouFeed(), { cursor: null, total: 20 });
  } catch (error) {
    return next(error);
  }
});

router.get('/following', (req, res) => ok(res, []));
router.get('/trending', async (req, res, next) => {
  try {
    return ok(res, await getTrendingBundle());
  } catch (error) {
    return next(error);
  }
});

export default router;
