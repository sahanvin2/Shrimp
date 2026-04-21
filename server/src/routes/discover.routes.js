import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listHashtags, listVideos } from '../services/mockStore.js';

const router = Router();

router.get('/', (req, res) => ok(res, { videos: listVideos(), hashtags: listHashtags() }));
router.get('/hashtag/:tag', (req, res) => ok(res, { tag: req.params.tag, videos: listVideos() }));

export default router;
