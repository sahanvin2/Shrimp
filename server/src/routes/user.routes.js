import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { getCreatorByUsername } from '../services/mockStore.js';
import { listVideos } from '../services/mockStore.js';

const router = Router();

router.get('/:username', (req, res) => ok(res, getCreatorByUsername(req.params.username)));
router.put('/me', (req, res) => ok(res, true));
router.post('/me/avatar', (req, res) => ok(res, true));
router.post('/me/banner', (req, res) => ok(res, true));
router.get('/:username/videos', (req, res) => ok(res, listVideos()));
router.get('/:username/liked', (req, res) => ok(res, listVideos()));
router.get('/:username/saved', (req, res) => ok(res, listVideos()));
router.get('/:username/followers', (req, res) => ok(res, []));
router.get('/:username/following', (req, res) => ok(res, []));
router.post('/:username/follow', (req, res) => ok(res, true));
router.put('/:username/notify', (req, res) => ok(res, true));

export default router;
