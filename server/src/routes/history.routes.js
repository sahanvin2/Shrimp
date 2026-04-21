import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { listVideos } from '../services/mockStore.js';

const router = Router();

router.get('/history', (req, res) => ok(res, listVideos().slice(0, 5)));
router.delete('/history', (req, res) => ok(res, true));
router.delete('/history/:videoId', (req, res) => ok(res, true));
router.put('/settings/history-pause', (req, res) => ok(res, true));

export default router;
