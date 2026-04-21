import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listHashtags, listVideos } from '../services/catalog.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		return ok(res, { videos: await listVideos(), hashtags: await listHashtags() });
	} catch (error) {
		return next(error);
	}
});

router.get('/hashtag/:tag', async (req, res, next) => {
	try {
		return ok(res, { tag: req.params.tag, videos: await listVideos() });
	} catch (error) {
		return next(error);
	}
});

export default router;
