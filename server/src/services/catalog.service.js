import { prisma } from '../config/database.js';
import { listCreators as fallbackCreators, listHashtags as fallbackHashtags, listVideos as fallbackVideos, getCreatorByUsername as fallbackCreator, getVideoById as fallbackVideo } from './mockStore.js';

function toNumber(value) {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
}

function normalizeCreator(creator) {
  if (!creator) {
    return null;
  }

  return {
    ...creator,
    totalViews: toNumber(creator.totalViews),
    totalLikes: toNumber(creator.totalLikes),
  };
}

function normalizeHashtag(hashtag) {
  if (!hashtag) {
    return null;
  }

  return hashtag;
}

function normalizeVideo(video) {
  if (!video) {
    return null;
  }

  const hashtags = video.hashtags
    ? video.hashtags.map((entry) => normalizeHashtag(entry.hashtag || entry))
    : [];

  return {
    ...video,
    viewCount: toNumber(video.viewCount),
    creator: normalizeCreator(video.creator),
    hashtags,
  };
}

export async function getVideoById(id) {
  try {
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        creator: true,
        hashtags: { include: { hashtag: true } },
      },
    });

    if (video) {
      return normalizeVideo(video);
    }
  } catch (error) {
    return normalizeVideo(fallbackVideo(id));
  }

  return normalizeVideo(fallbackVideo(id));
}

export async function getCreatorByUsername(username) {
  try {
    const creator = await prisma.user.findUnique({
      where: { username },
    });

    if (creator) {
      return normalizeCreator(creator);
    }
  } catch (error) {
    return normalizeCreator(fallbackCreator(username));
  }

  return normalizeCreator(fallbackCreator(username));
}

export async function listVideos(limit = 30) {
  try {
    const videos = await prisma.video.findMany({
      where: { status: 'active', visibility: 'public' },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      include: {
        creator: true,
        hashtags: { include: { hashtag: true } },
      },
    });

    if (videos.length > 0) {
      return videos.map(normalizeVideo);
    }
  } catch (error) {
    return fallbackVideos().slice(0, limit);
  }

  return fallbackVideos().slice(0, limit);
}

export async function listCreators(limit = 20) {
  try {
    const creators = await prisma.user.findMany({
      where: { isCreator: true },
      orderBy: [{ subscriberCount: 'desc' }, { createdAt: 'desc' }],
      take: limit,
    });

    if (creators.length > 0) {
      return creators.map(normalizeCreator);
    }
  } catch (error) {
    return fallbackCreators().slice(0, limit);
  }

  return fallbackCreators().slice(0, limit);
}

export async function listHashtags(limit = 20) {
  try {
    const hashtags = await prisma.hashtag.findMany({
      orderBy: [{ trendScore: 'desc' }, { videoCount: 'desc' }],
      take: limit,
    });

    if (hashtags.length > 0) {
      return hashtags.map(normalizeHashtag);
    }
  } catch (error) {
    return fallbackHashtags().slice(0, limit);
  }

  return fallbackHashtags().slice(0, limit);
}

export async function getTrendingBundle() {
  return {
    hashtags: await listHashtags(20),
    creators: await listCreators(10),
    videos: await listVideos(20),
  };
}
