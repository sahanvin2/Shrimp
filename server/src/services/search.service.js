import { listCreators, listHashtags, listVideos } from './catalog.service.js';
import { prisma } from '../config/database.js';

export async function searchAll(query) {
  try {
    const q = (query || '').toLowerCase();
    let videos = await listVideos(30);
    let creators = await listCreators(30);
    let hashtags = await listHashtags(30);

    if (q) {
      const [videoMatches, creatorMatches, hashtagMatches] = await Promise.all([
        prisma.video.findMany({
          where: {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
            ],
          },
          include: { creator: true, hashtags: { include: { hashtag: true } } },
          take: 30,
        }).catch(() => []),
        prisma.user.findMany({
          where: {
            isCreator: true,
            OR: [
              { displayName: { contains: q, mode: 'insensitive' } },
              { username: { contains: q, mode: 'insensitive' } },
            ],
          },
          take: 30,
        }).catch(() => []),
        prisma.hashtag.findMany({
          where: { tag: { contains: q, mode: 'insensitive' } },
          take: 30,
        }).catch(() => []),
      ]);

      if (videoMatches.length > 0) {
        videos = videoMatches.map((video) => ({ ...video, hashtags: video.hashtags.map((entry) => entry.hashtag) }));
      }
      if (creatorMatches.length > 0) {
        creators = creatorMatches;
      }
      if (hashtagMatches.length > 0) {
        hashtags = hashtagMatches;
      }
    }

    return {
      videos,
      creators,
      hashtags,
    };
  } catch (error) {
    throw error;
  }
}
