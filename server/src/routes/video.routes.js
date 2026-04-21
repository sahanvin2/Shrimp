import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { getVideoById, listVideos } from '../services/mockStore.js';

const router = Router();

router.get('/:videoId', (req, res) => ok(res, getVideoById(req.params.videoId)));
router.post('/', (req, res) => ok(res, { id: 'video-new' }));
router.put('/:videoId', (req, res) => ok(res, true));
router.delete('/:videoId', (req, res) => ok(res, true));
router.post('/:videoId/like', (req, res) => ok(res, true));
router.post('/:videoId/save', (req, res) => ok(res, true));
router.post('/:videoId/share', (req, res) => ok(res, true));
router.post('/:videoId/view', (req, res) => ok(res, true));
router.post('/:videoId/watch-progress', (req, res) => ok(res, true));
router.get('/:videoId/related', (req, res) => ok(res, listVideos().slice(0, 10)));
router.post('/:videoId/report', (req, res) => ok(res, true));
router.get('/:videoId/analytics', (req, res) => ok(res, { views: 100 }));
router.get('/:videoId/comments', (req, res) => ok(res, []));
router.post('/:videoId/comments', (req, res) => ok(res, true));

export default router;
