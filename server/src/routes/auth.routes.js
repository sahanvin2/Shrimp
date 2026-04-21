import { Router } from 'express';
import { authRateLimiter } from '../middleware/rateLimiter.js';
import { ok } from '../controllers/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { prisma } from '../config/database.js';
import { env } from '../config/env.js';

function sanitizeUser(user) {
	if (!user) {
		return null;
	}

	const { passwordHash, ...safeUser } = user;
	return safeUser;
}

function signAccessToken(user) {
	return jwt.sign(
		{
			sub: user.id,
			username: user.username,
			isAdmin: user.isAdmin,
			isCreator: user.isCreator,
		},
		env.JWT_SECRET,
		{ expiresIn: '15m' }
	);
}

async function createRefreshToken(userId) {
	const token = randomUUID();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	await prisma.refreshToken.create({ data: { userId, token, expiresAt } });
	return token;
}

const router = Router();

router.post('/register', authRateLimiter, async (req, res, next) => {
	try {
		const { username, displayName, email, password } = req.body || {};
		if (!username || !displayName || !email || !password) {
			return res.status(400).json({ success: false, data: null, error: 'Missing required fields' });
		}

		const existingUser = await prisma.user.findFirst({
			where: { OR: [{ username }, { email }] },
		});

		if (existingUser) {
			return res.status(409).json({ success: false, data: null, error: 'Account already exists' });
		}

		const passwordHash = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: { username, displayName, email, passwordHash },
		});

		const refreshToken = await createRefreshToken(user.id);
		const accessToken = signAccessToken(user);

		return ok(res, { user: sanitizeUser(user), accessToken, refreshToken });
	} catch (error) {
		return next(error);
	}
});

router.post('/login', authRateLimiter, async (req, res, next) => {
	try {
		const { email, username, password } = req.body || {};
		const user = await prisma.user.findFirst({
			where: email ? { email } : { username },
		});

		if (!user) {
			return res.status(401).json({ success: false, data: null, error: 'Invalid credentials' });
		}

		const isValid = await bcrypt.compare(password || '', user.passwordHash);
		if (!isValid) {
			return res.status(401).json({ success: false, data: null, error: 'Invalid credentials' });
		}

		const refreshToken = await createRefreshToken(user.id);
		const accessToken = signAccessToken(user);

		return ok(res, { user: sanitizeUser(user), accessToken, refreshToken });
	} catch (error) {
		return next(error);
	}
});

router.post('/refresh', async (req, res, next) => {
	try {
		const { refreshToken } = req.body || {};
		if (!refreshToken) {
			return res.status(400).json({ success: false, data: null, error: 'Missing refreshToken' });
		}

		const storedToken = await prisma.refreshToken.findUnique({
			where: { token: refreshToken },
			include: { user: true },
		});

		if (!storedToken || storedToken.revokedAt || storedToken.expiresAt < new Date()) {
			return res.status(401).json({ success: false, data: null, error: 'Invalid refresh token' });
		}

		const nextRefreshToken = await createRefreshToken(storedToken.userId);
		await prisma.refreshToken.update({
			where: { token: refreshToken },
			data: { revokedAt: new Date() },
		});

		return ok(res, { accessToken: signAccessToken(storedToken.user), refreshToken: nextRefreshToken });
	} catch (error) {
		return next(error);
	}
});

router.post('/logout', async (req, res, next) => {
	try {
		const { refreshToken } = req.body || {};
		if (refreshToken) {
			await prisma.refreshToken.updateMany({
				where: { token: refreshToken },
				data: { revokedAt: new Date() },
			});
		}
		return ok(res, true);
	} catch (error) {
		return next(error);
	}
});

router.get('/me', async (req, res, next) => {
	try {
		const header = req.headers.authorization || '';
		const token = header.startsWith('Bearer ') ? header.slice(7) : null;
		if (!token) {
			return res.status(401).json({ success: false, data: null, error: 'Unauthorized' });
		}

		const payload = jwt.verify(token, env.JWT_SECRET);
		const user = await prisma.user.findUnique({ where: { id: payload.sub } });
		return ok(res, sanitizeUser(user));
	} catch (error) {
		return res.status(401).json({ success: false, data: null, error: 'Unauthorized' });
	}
});

router.post('/forgot-password', (req, res) => ok(res, true));
router.post('/reset-password', (req, res) => ok(res, true));

export default router;
