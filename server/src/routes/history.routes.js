import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listVideos } from '../services/catalog.service.js';

const router = Router();

router.get('/history', async (req, res, next) => {
	try {
		return ok(res, await listVideos(5));
	} catch (error) {
		return next(error);
	}
});
router.delete('/history', (req, res) => ok(res, true));
router.delete('/history/:videoId', (req, res) => ok(res, true));
router.put('/settings/history-pause', (req, res) => ok(res, true));

export default router;
