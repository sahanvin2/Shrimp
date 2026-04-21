import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { getCreatorByUsername, listVideos } from '../services/catalog.service.js';

const router = Router();

router.get('/:username', async (req, res, next) => {
	try {
		return ok(res, await getCreatorByUsername(req.params.username));
	} catch (error) {
		return next(error);
	}
});
router.put('/me', (req, res) => ok(res, true));
router.post('/me/avatar', (req, res) => ok(res, true));
router.post('/me/banner', (req, res) => ok(res, true));
router.get('/:username/videos', async (req, res, next) => {
	try {
		return ok(res, await listVideos());
	} catch (error) {
		return next(error);
	}
});
router.get('/:username/liked', async (req, res, next) => {
	try {
		return ok(res, await listVideos());
	} catch (error) {
		return next(error);
	}
});
router.get('/:username/saved', async (req, res, next) => {
	try {
		return ok(res, await listVideos());
	} catch (error) {
		return next(error);
	}
});
router.get('/:username/followers', (req, res) => ok(res, []));
router.get('/:username/following', (req, res) => ok(res, []));
router.post('/:username/follow', (req, res) => ok(res, true));
router.put('/:username/notify', (req, res) => ok(res, true));

export default router;
