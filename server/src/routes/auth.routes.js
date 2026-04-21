import { Router } from 'express';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { ok } from '../controllers/index.js';

const router = Router();

router.post('/register', authRateLimiter, (req, res) => ok(res, { accessToken: 'demo', refreshToken: 'demo' }));
router.post('/login', authRateLimiter, (req, res) => ok(res, { accessToken: 'demo', refreshToken: 'demo' }));
router.post('/refresh', (req, res) => ok(res, { accessToken: 'demo' }));
router.post('/logout', (req, res) => ok(res, true));
router.get('/me', (req, res) => ok(res, null));
router.post('/forgot-password', (req, res) => ok(res, true));
router.post('/reset-password', (req, res) => ok(res, true));

export default router;
