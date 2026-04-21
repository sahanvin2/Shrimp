import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { getVideoById, listVideos } from '../services/catalog.service.js';
import { prisma } from '../config/database.js';
import { slugify } from '../utils/slugify.js';

const router = Router();

router.get('/:videoId', async (req, res, next) => {
	try {
		return ok(res, await getVideoById(req.params.videoId));
	} catch (error) {
		return next(error);
	}
});
router.post('/', async (req, res, next) => {
	try {
		const { creatorId, title, description, tags = [] } = req.body || {};
		if (!creatorId || !title) {
			return res.status(400).json({ success: false, data: null, error: 'Missing creatorId or title' });
		}

		const video = await prisma.video.create({
			data: {
				creatorId,
				title,
				slug: slugify(title),
				description,
				tags: Array.isArray(tags) ? tags : String(tags).split(',').map((tag) => tag.trim()).filter(Boolean),
				status: 'processing',
				visibility: 'public',
			},
			include: { creator: true, hashtags: { include: { hashtag: true } } },
		});

		return ok(res, video);
	} catch (error) {
		return next(error);
	}
});

router.put('/:videoId', async (req, res, next) => {
	try {
		const { title, description, visibility, allowComments, allowDownload, allowDuet } = req.body || {};
		const video = await prisma.video.update({
			where: { id: req.params.videoId },
			data: {
				...(typeof title === 'string' ? { title } : {}),
				...(typeof description === 'string' ? { description } : {}),
				...(typeof visibility === 'string' ? { visibility } : {}),
				...(typeof allowComments === 'boolean' ? { allowComments } : {}),
				...(typeof allowDownload === 'boolean' ? { allowDownload } : {}),
				...(typeof allowDuet === 'boolean' ? { allowDuet } : {}),
			},
		});

		return ok(res, video);
	} catch (error) {
		return next(error);
	}
});

router.delete('/:videoId', async (req, res, next) => {
	try {
		const video = await prisma.video.update({
			where: { id: req.params.videoId },
			data: { visibility: 'private', status: 'deleted' },
		});
		return ok(res, video);
	} catch (error) {
		return next(error);
	}
});

router.post('/:videoId/like', async (req, res, next) => {
	try {
		return ok(res, await prisma.video.update({ where: { id: req.params.videoId }, data: { likeCount: { increment: 1 } } }));
	} catch (error) {
		return next(error);
	}
});

router.post('/:videoId/save', async (req, res, next) => {
	try {
		return ok(res, await prisma.video.update({ where: { id: req.params.videoId }, data: { saveCount: { increment: 1 } } }));
	} catch (error) {
		return next(error);
	}
});

router.post('/:videoId/share', async (req, res, next) => {
	try {
		return ok(res, await prisma.video.update({ where: { id: req.params.videoId }, data: { shareCount: { increment: 1 } } }));
	} catch (error) {
		return next(error);
	}
});

router.post('/:videoId/view', async (req, res, next) => {
	try {
		return ok(res, await prisma.video.update({ where: { id: req.params.videoId }, data: { viewCount: { increment: 1 } } }));
	} catch (error) {
		return next(error);
	}
});

router.post('/:videoId/watch-progress', (req, res) => ok(res, true));
router.get('/:videoId/related', async (req, res, next) => {
	try {
		return ok(res, await listVideos(10));
	} catch (error) {
		return next(error);
	}
});
router.post('/:videoId/report', (req, res) => ok(res, true));
router.get('/:videoId/analytics', async (req, res, next) => {
	try {
		const video = await prisma.video.findUnique({ where: { id: req.params.videoId } });
		return ok(res, video ? { views: Number(video.viewCount), likes: video.likeCount, comments: video.commentCount } : null);
	} catch (error) {
		return next(error);
	}
});
router.get('/:videoId/comments', async (req, res, next) => {
	try {
		const comments = await prisma.comment.findMany({
			where: { videoId: req.params.videoId },
			orderBy: { createdAt: 'desc' },
			include: { user: true },
			take: 50,
		});
		return ok(res, comments);
	} catch (error) {
		return next(error);
	}
});
router.post('/:videoId/comments', async (req, res, next) => {
	try {
		const { userId, body } = req.body || {};
		if (!userId || !body) {
			return res.status(400).json({ success: false, data: null, error: 'Missing userId or body' });
		}

		const comment = await prisma.comment.create({
			data: {
				videoId: req.params.videoId,
				userId,
				body,
			},
		});

		return ok(res, comment);
	} catch (error) {
		return next(error);
	}
});

export default router;
