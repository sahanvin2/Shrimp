import { Router } from 'express';
import { ok } from '../controllers/index.js';
import { prisma } from '../config/database.js';

const router = Router();

router.get('/analytics/overview', async (req, res, next) => {
	try {
		const [viewsAggregate, creatorsCount, likesCount, watchTimeAggregate] = await Promise.all([
			prisma.video.aggregate({ _sum: { viewCount: true } }).catch(() => ({ _sum: { viewCount: 0n } })),
			prisma.user.count({ where: { isCreator: true } }).catch(() => 0),
			prisma.like.count().catch(() => 0),
			prisma.watchHistory.aggregate({ _sum: { watchedSeconds: true } }).catch(() => ({ _sum: { watchedSeconds: 0 } })),
		]);

		return ok(res, {
			views: Number(viewsAggregate._sum.viewCount || 0),
			subscribers: creatorsCount,
			likes: likesCount,
			watchTime: Number(watchTimeAggregate._sum.watchedSeconds || 0),
		});
	} catch (error) {
		return next(error);
	}
});

router.get('/analytics/video/:id', async (req, res, next) => {
	try {
		const video = await prisma.video.findUnique({ where: { id: req.params.id } });
		return ok(res, video ? { id: video.id, views: Number(video.viewCount), likes: video.likeCount, comments: video.commentCount } : null);
	} catch (error) {
		return next(error);
	}
});

router.get('/videos', async (req, res, next) => {
	try {
		const videos = await prisma.video.findMany({
			orderBy: { createdAt: 'desc' },
			take: 50,
			include: { creator: true },
		});
		return ok(res, videos);
	} catch (error) {
		return next(error);
	}
});

export default router;
