import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import videoRoutes from './video.routes.js';
import feedRoutes from './feed.routes.js';
import discoverRoutes from './discover.routes.js';
import searchRoutes from './search.routes.js';
import interactionRoutes from './interaction.routes.js';
import commentRoutes from './comment.routes.js';
import creatorRoutes from './creator.routes.js';
import notificationRoutes from './notification.routes.js';
import historyRoutes from './history.routes.js';
import eventsRoutes from './events.routes.js';
import studioRoutes from './studio.routes.js';
import seoRoutes from './seo.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/videos', videoRoutes);
router.use('/feed', feedRoutes);
router.use('/discover', discoverRoutes);
router.use('/search', searchRoutes);
router.use('/comments', interactionRoutes);
router.use('/comments', commentRoutes);
router.use('/creators', creatorRoutes);
router.use('/notifications', notificationRoutes);
router.use('/me', historyRoutes);
router.use('/events', eventsRoutes);
router.use('/studio', studioRoutes);
router.use('/', seoRoutes);
router.use('/admin', adminRoutes);

export default router;
